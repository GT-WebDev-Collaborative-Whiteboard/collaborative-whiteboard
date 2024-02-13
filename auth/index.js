import crypto from 'crypto';
import fernet from 'fernet';
import express from 'express';
import 'dotenv/config';

const app = express();
const PORT = 7766;
const secret = new fernet.Secret(process.env.FERNET_KEY);

// since the client is a browser-based app, and is "public", the client id is not really secret, neither is the redirect url.
/*
  Flow:
  Web app <request authorization code from auth server, passing user credentials> -> auth server
  Web app <- <receives authorization code with scope (user id)> auth server
  Web app <exchanges authorization code for access token> auth server
  Web app stores the access token in local storage 
*/

/* req body
{
  username: <hashed username>
  password: <hashed password>
  accountExists: <boolean>
}
*/
app.get('/auth', (req, res) => {
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
      res.status(400).send("Invalid or empty client id or redirect url");
      return;
    }
    if (!isValidUser(user, password)) {
      res.status(400).send("Invalid user credentials");
      return;
    }
    const authorizationCode = generateAuthorizationCode(user);
    res.redirect(redirect_url + "?code=" + authorizationCode);
  } else {
    res.status(400).send("Invalid response type");
  }
});

function generateAuthorizationCode(user) {
  const encryptedToken = new fernet.Token({
    secret,
  });
  encryptedToken.encode("Hello");

  console.log(
    new fernet.Token({
      secret,
      token: encryptedToken.token,
      ttl: 0
    }).decode()
  );
}

app.listen(PORT, () => {
  console.log(`auth server listening on port ${PORT}`);
});