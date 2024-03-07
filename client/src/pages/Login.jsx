import React from 'react';
import '../styles/login.css';

function Login() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
        <Header />
        <div className="h-2 bg-gray-200 my-6 rounded"></div>
        <div className="flex justify-around">
          <button className="btn-secondary">Login</button>
          <button className="btn-secondary">Sign-Up</button>
        </div>
        <div className="flex">
          <div className="w-1/2 p-4">
            <LoginForm />
          </div>
          <div className="w-1/2 p-4">
            <SignUpForm />
          </div>
        </div>
      </div>
    </div>
  );
};

function Header() {
  return (
    <header className="mb-8 text-center">
      <h1 className="text-4xl font-bold text-gray-800">Collaborative Whiteboard</h1>
      <h3 className="text-lg font-semibold text-gray-600">Login/Sign-Up Form</h3>
    </header>
  );
}

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

function SignUpForm() {
  const handleSignUp = () => {
    //Sign-Up Logic
    console.log('Sign-Up button clicked');
  };

  return (
    <div className="signup-box">
      <input type="text" className="input-field" placeholder="Enter your name" />
      <input type="email" className="input-field" placeholder="Email" />
      <input type="password" className="input-field" placeholder="Password" />
      <input type="password" className="input-field" placeholder="Confirm password" />
      <button className="btn-primary" onClick={handleSignUp}>Sign-Up</button>
    </div>
  );
}

export default Login;