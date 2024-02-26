import crypto, { verify } from 'crypto';
import fernet from 'fernet';
import express from 'express';
import 'dotenv/config';
import axios from 'axios';

const app = express();
const PORT = 7766;
const secret = new fernet.Secret(process.env.FERNET_KEY);

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
    redirect_url: "https://localhost:5180/oauthredirect",
  },
  {
    client_id: "local-sample-client-id",
    client_secret: "local-sample-client-secret",
    redirect_url: "https://localhost:7766/oauthredirect"
  }
]
const CODE_LIFE_SPAN = 60000; // 60 seconds
const TOKEN_LIFE_SPAN = 3600000

app.post('/auth', (req, res) => {
  const {
    response_type,
    client_id,
    redirect_url
  } = req.params;

  const {
    user,
    password
  } = req.body;

  // handle differently depending on response type
  // current only authorization code flow is supported
  if (response_type === "code") {
    if (typeof client_id === undefined || typeof redirect_url === undefined || client_id !== process.env.VALID_CLIENT) { // add redirect url check also
      res.status(400).send("Invalid request");
      return;
    }

    if (!verifyClientInfo(client_id, redirect_url)) {
      res.status(400).send("Invalid client");
      return;
    }

    if (!authenticateUser(user, password)) {
      res.status(400).send("Invalid user credentials");
      return;
    }
    const authorizationCode = generateAuthorizationCode(user, client_id, redirect_url);
    res.status(303).redirect(redirect_url + "?code=" + authorizationCode);
  } else {
    res.status(400).send("Invalid response type");
  }
});

function authenticateUser(user, password) {
  return false;
}

function verifyClientInfo(client_id, redirect_url) {
  for (const client of registeredClients) {
    if (client.client_id === client_id && client.redirect_url === redirect_url) return true;
  }
  return false;
}

function authenticateClient(client_id, client_secret) {
  return false;
}

function verifyAuthorizationCode(client_id, redirect_url) {
  return false;
}

function generateAuthorizationCode(user, client_id, redirect_url) {
  const encryptedToken = new fernet.Token({
    secret,
  });
  const data = {
    user,
    client_id,
    redirect_url
  };
  encryptedToken.encode(JSON.stringify(data));
  // console.log(
  //   new fernet.Token({
  //     secret,
  //     token: encryptedToken.token,
  //     ttl: 0
  //   }).decode()
  // );
  const code = encryptedToken.token;
  authorizationCodes[code] = {
    client_id,
    redirect_url,
    exp: new Date.now() + CODE_LIFE_SPAN
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
    res.send(400).send("Invalid request");
    return;
  }

  if (!authenticateClient(client_id, client_secret)) {
    return res.send(400).send("Invalid client");
  }

  const accessToken = generateAccessToken(authorizationCode, client_id, redirect_url);
  if (!accessToken) {
    return res.send(400).send("Access denied");
  }
});

function generateAccessToken(authorizationCode, client_id, redirect_url) {
  const data = JSON.parse(new fernet.Token({
    secret,
    token: authorizationCode,
    ttl: 0
  }).decode());

  const {
    user,
    data_client_id,
    data_redirect_url,
  } = data;

  if (!verifyAuthorizationCode(client_id, redirect_url)) {
    return null;
  }

  const payload = {
    user,
    iss: ISSUER,
    exp: Date.now() + TOKEN_LIFE_SPAN
  };

  const accessToken = {
    access_token: payload,
    token_type: "JWT",
    expires_in: payload.exp
  };

  return JSON.stringify(accessToken);
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

app.listen(PORT, () => {
  console.log(`auth server listening on port ${PORT}`);
});