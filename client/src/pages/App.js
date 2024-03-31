import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginSignupForm from './LoginSignupForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignupForm />} />
      </Routes>
    </Router>
  );
};

export default App;

