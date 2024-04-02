import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginSignupForm = () => {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signupMessage, setSignupMessage] = useState('');
  const [loginMessage, setLoginMessage] = useState('');

  const handleSignupClick = () => {
    setIsSignup(true);
    setLoginMessage('');
  };

  const handleLoginClick = () => {
    setIsSignup(false);
    setSignupMessage('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (isSignup) {
        setSignupMessage('Sign-Up Successful!');
        setLoginMessage('');
      } else {
        setLoginMessage('Login Successful!');
        setSignupMessage('');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-semibold text-indigo-600 font-poppins">Collaborative Whiteboard</h1>
        <h3 className="text-xl font-medium tracking-wide font-poppins">Login/Sign-Up Form</h3>
      </header>

      <div className="bg-white rounded-lg shadow-md p-12 sm:w-[500px]">
        <div className="flex justify-center mb-8">
          <div className="flex rounded-full bg-gray-200 p-1">
            <button
              className={`px-6 py-3 rounded-full ${
                !isSignup ? 'bg-green-200 text-green-700 font-medium font-poppins' : 'text-gray-500 font-poppins'
              }`}
              onClick={handleLoginClick}
            >
              Login
            </button>
            <button
              className={`px-6 py-3 rounded-full ${
                isSignup ? 'bg-green-200 text-green-700 font-medium font-poppins' : 'text-gray-500 font-poppins'
              }`}
              onClick={handleSignupClick}
            >
              Sign-Up
            </button>
          </div>
        </div>
        {loginMessage && <p className="text-green-500 mb-4 text-center">{loginMessage}</p>}
        {signupMessage && <p className="text-green-500 mb-4 text-center">{signupMessage}</p>}

        <form onSubmit={handleSubmit}>
          {!isSignup && (
            <div className="flex flex-col items-center">
              <div className="flex flex-col gap-6 w-full">
                <input
                  type="email"
                  placeholder="Email"
                  className="px-6 py-4 bg-gray-200 rounded-full outline-none text-lg font-medium font-poppins"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="px-6 py-4 bg-gray-200 rounded-full outline-none text-lg font-medium font-poppins"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="mt-8 px-8 py-4 bg-green-400 text-white rounded-full hover:bg-green-500 text-xl"
              >
                Login
              </button>
            </div>
          )}

          {isSignup && (
            <div className="flex flex-col items-center">
              <div className="flex flex-col gap-6 w-full">
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="px-6 py-4 bg-gray-200 rounded-full outline-none text-lg"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="px-6 py-4 bg-gray-200 rounded-full outline-none text-lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="px-6 py-4 bg-gray-200 rounded-full outline-none text-lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Confirm password"
                  className="px-6 py-4 bg-gray-200 rounded-full outline-none text-lg"
                />
              </div>
              <button
                type="submit"
                className="mt-8 px-8 py-4 bg-green-400 text-white rounded-full hover:bg-green-500 text-xl"
              >
                Sign-Up
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginSignupForm;
