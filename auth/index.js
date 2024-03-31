import crypto, { verify } from 'crypto';
import fernet from 'fernet';
import express from 'express';
import 'dotenv/config';
import axios from 'axios';
import cors from 'cors';
import { authenticateUser } from './database/actions/user-handler.js';
import bodyParser from 'body-parser';

const app = express();
const PORT = 7766;
const secret = new fernet.Secret(process.env.FERNET_KEY);

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }))
/* req body
{
  username: <hashed username>
  password: <hashed password>
  accountExists: <boolean>
}
*/

// NOTE: will be in the database or somewhere else, but here temporarily
const authorizationCodes = {};
const registeredClients = [
  {
    client_id: "sample-client-id",
    client_secret: "sample-client-secret",
    redirect_url: "http://localhost:5173/oauthredirect",
  },
  {
    client_id: "local-sample-client-id",
    client_secret: "local-sample-client-secret",
    redirect_url: "https://localhost:7766/oauthredirect"
  },
]
const CODE_LIFE_SPAN = 60000; // 60 seconds
const TOKEN_LIFE_SPAN = 3600000

// get the authorization code
app.post('/auth', async (req, res) => {
  const {
    response_type,
    client_id,
    redirect_url
  } = req.query;
  const {
    user,
    password
  } = req.body;
  // console.log("body", req.body);

  // handle differently depending on response type
  // current only authorization code flow is supported
  if (response_type === "code") {
    if (typeof client_id === undefined || typeof redirect_url === undefined) { // add redirect url check also
      res.status(400).send("Invalid request");
      return;
    }

    if (!verifyClientInfo(client_id, redirect_url)) {
      res.status(400).send("Invalid client");
      return;
    }

    if (!authenticateUser(user, password, process.env.AUTH_MONGO_URI)) {
      res.status(400).send("Invalid user credentials");
      return;
    }
    const authorizationCode = generateAuthorizationCode(user, client_id, redirect_url);
    // console.log("auth code: ", authorizationCode);
    // res.status(303).redirect(redirect_url + "?code=" + authorizationCode);
    res.status(200).send(authorizationCode);
  } else {
    res.status(400).send("Invalid response type");
  }
});

function verifyClientInfo(client_id, redirect_url) {
  for (const client of registeredClients) {
    if (client.client_id === client_id && client.redirect_url === redirect_url) return true;
  }
  return false;
}

function authenticateClient(client_id, client_secret) {
  for (const client of registeredClients) {
    if (client.client_id === client_id && client.client_secret === client_secret) return true;
  }
  return false;
}

// returns username if successfully verified
function verifyAuthorizationCode(authorizationCode, client_id, redirect_url) {
  const data = JSON.parse(new fernet.Token({
    secret,
    token: authorizationCode,
    ttl: 0
  }).decode());

  const user = data.user;
  const data_client_id = data.client_id;
  const data_redirect_url = data.redirect_url;

  if (data_client_id === client_id && data_redirect_url === redirect_url) return user;
  return null;
}

function generateAuthorizationCode(user, client_id, redirect_url) {
  const encryptedToken = new fernet.Token({
    secret,
  });
  const data = {
    user,
    client_id,
    redirect_url,
    exp: Date.now() + CODE_LIFE_SPAN,
  };
  encryptedToken.encode(JSON.stringify(data));
  const code = encryptedToken.token;
  authorizationCodes[code] = {
    client_id,
    redirect_url,
    exp: data.exp
  }
  return code;
}

// get token from authorization code
app.post('/token', (req, res) => {
  const {
    grant_type,
    authorizationCode,
    client_id,
    client_secret,
    redirect_url
  } = req.body;

  if (grant_type != "authorization_code" || !authorizationCode || !client_id || !client_secret || !redirect_url) {
    res.status(400).send("Invalid request");
    return;
  }

  if (!authenticateClient(client_id, client_secret)) {
    return res.status(400).send("Invalid client");
  }

  const accessToken = generateAccessToken(authorizationCode, client_id, redirect_url);
  if (!accessToken) {
    return res.status(400).send("Access denied");
  }

  return res.status(200).send(accessToken);
});

function generateAccessToken(authorizationCode, client_id, redirect_url) {
  const user = verifyAuthorizationCode(authorizationCode, client_id, redirect_url);
  if (!user) {
    return null;
  }

  const payload = {
    user,
    iss: process.env.AUTH_ISS,
    exp: Date.now() + TOKEN_LIFE_SPAN
  };

  const accessToken = {
    access_token: payload,
    token_type: "JWT",
    expires_in: payload.exp,
    iss: process.env.AUTH_ISS
  };

  const encryptedToken = new fernet.Token({
    secret
  });

  encryptedToken.encode(JSON.stringify(accessToken));
  return encryptedToken.token;
}

app.get('/test', (req, res) => {
  const sampleAuthorizationCodeReqData = {
    response_type: "authorization_code",
    client_id: "local-sample-client-id",
    client_secret: "local-sample-client-secret",
    redirect_url: "https://localhost:7766/oauthredirect"
  };

  axios.post("http://localhost:7766/auth", sampleAuthorizationCodeReqData).then((res) => {
  console.log(res);  
  console.log("posted");
  });
});

// receive access token from resource server, return user is access token is valid, otherwise return status 400
app.get("/verifytoken", async (req, res) => {
  let { token } = req.query;
  const response = await getUser(token);
  if (typeof response === "string") {
    return res.status(400).send(response);
  }
  const { user } = response;
  return res.status(200).send(user);
});

async function getUser(token) {
  try {
    token = JSON.parse(new fernet.Token({
      secret,
      token,
      ttl: 0,
    }).decode());
  } catch (e) {
    return "Unintelligible token";
  }

  const {
    access_token,
    token_type,
    expires_in,
    iss,
  } = token;

  // check validity
  if (!access_token || !token_type || !expires_in || !iss) {
    return "Invalid request";
  }

  if (iss !== process.env.AUTH_ISS) {
    return "Invalid issuer";
  }

  if (expires_in < Date.now()) {
    return "Token expired";
  }
  return { user: access_token.user };
}

// given a token and a whiteboard, return whether or not the token is valid to access the whiteboard
app.get("/verifytokenwhiteboard", async (req, res) => {
  const {
    token,
    whiteboard
  } = req.query;

  if (!whiteboard) {
    return res.status(400).send("Invalid request");
  }

  const response = await getUser(token);
  if (typeof response === "string") {
    return res.status(400).send(response);
  }

  const { user } = response;
  
  // check if whiteboard is public and if user has access to it
});

app.listen(PORT, () => {
  console.log(`auth server listening on port ${PORT}`);
});