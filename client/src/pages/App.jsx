import React from 'react';
import Header from './Header';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

function App() {
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
}

export default App;
