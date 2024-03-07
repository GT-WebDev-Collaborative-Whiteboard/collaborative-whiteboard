import React from 'react';

function LoginForm() {
  const handleLogin = () => {
    //Login Logic
    console.log('Login button clicked');
  };

  return (
    <div className="login-box">
      <input type="email" className="input-field" placeholder="Email" />
      <input type="password" className="input-field" placeholder="Password" />
      <button className="btn-primary" onClick={handleLogin}>Login</button>
    </div>
  );
}

export default LoginForm;
