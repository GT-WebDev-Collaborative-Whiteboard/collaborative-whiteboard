function Login() {
  async function buttonHandler() {
    const client = {
      client_id: "sample-client-id",
      client_secret: "sample-client-secret",
      redirect_url: "http://localhost:5173/oauthredirect",
      response_type: "code"
    };
    const userData = {
      user: "testname",
      password: "testpassword"
    }
    const url = 'http://localhost:7766/auth?' + new URLSearchParams(client);
    
    let data = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData),
    })
    data = await data.text();

    const tokenBody = {
      grant_type: "authorization_code",
      authorizationCode: data,
      client_id: client.client_id,
      client_secret: client.client_secret,
      redirect_url: client.redirect_url
    };

    let token = await fetch('http://localhost:7766/token', {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(tokenBody)
    });

    token = await token.text();

    localStorage.setItem("collab-whiteboard", token);
    // let user = await fetch('http://localhost:7766/verifytoken?' + new URLSearchParams({ token: token }), {
    //   method: "GET",
    //   mode: "cors",
    //   header: {
    //     "Content-Type": "application/json"
    //   },
    // })

    // console.log(await user.text());
  }
  return (
    <>
      <p>Login page</p>
      <button onClick={buttonHandler}>Login</button>
    </>
  )
};

export default Login;