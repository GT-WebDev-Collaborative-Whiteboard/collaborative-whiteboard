import React from 'react';

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

export default SignUpForm;
