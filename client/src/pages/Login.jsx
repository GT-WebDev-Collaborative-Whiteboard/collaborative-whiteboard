import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginSignupForm = () => {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(''); // Added username state
  const [confirmPassword, setConfirmPassword] = useState(''); // Added confirmPassword state
  const [signupMessage, setSignupMessage] = useState('');
  const [loginMessage, setLoginMessage] = useState('');

  const handleLoginClick = () => {
    setSignupMessage('');
    setIsSignup(false);
  };

  const handleSignupClick = () => {
    setLoginMessage('');
    setIsSignup(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (isSignup) {
        setLoginMessage('');
        // Add sign-up logic here
        if (password === confirmPassword) {
          // Call registerUser function with username, email, and password
          registerUser(username, email, password);
          setSignupMessage('Sign-Up Successful!');
        } else {
          setSignupMessage('Passwords do not match');
        }
      } else {
        setSignupMessage('');
        // Add login logic here
        setLoginMessage('Login Successful!');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const registerUser = (username, email, password) => {
    try {
      // Implement your sign-up logic here
      // You can make an API call or perform necessary operations
      console.log('Registering user:', username, email, password);
    } catch (error) {
      console.error('Error registering user:', error);
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
          <div className="flex flex-col items-center h-[280px] transition-all duration-300">
            {!isSignup && (
              <div className="flex flex-col gap-4 w-full">
                <input
                  type="email"
                  placeholder="Email"
                  className="px-4 py-3 bg-gray-200 rounded-full outline-none text-base font-medium font-poppins"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="px-4 py-3 bg-gray-200 rounded-full outline-none text-base font-medium font-poppins"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            )}

            {isSignup && (
              <div className="flex flex-col gap-4 w-full transition-all duration-300">
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="px-4 py-3 bg-gray-200 rounded-full outline-none text-base font-poppins"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="px-4 py-3 bg-gray-200 rounded-full outline-none text-base font-poppins"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="px-4 py-3 bg-gray-200 rounded-full outline-none text-base font-poppins"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Confirm password"
                  className="px-4 py-3 bg-gray-200 rounded-full outline-none text-base font-poppins"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            )}
            <button
              type="submit"
              className="mt-6 px-6 py-3 bg-green-400 text-white rounded-full hover:bg-green-500 text-base"
            >
              {isSignup ? 'Sign-Up' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginSignupForm;
