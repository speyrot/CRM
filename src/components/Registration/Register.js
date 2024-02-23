import React, { useState } from 'react';
import axios from 'axios';
import '../Login/LoginPage.css'; 

const RegistrationPage = ({ onNavigateToLogin }) => { 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegistration = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/api/auth/register', {
        username,
        password,
      });

      localStorage.setItem('token', response.data.token);

      window.location.href = '/dashboard';
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message); 
      } else {
        setErrorMessage('An error occurred during registration.');
      }
    }
  };

  return (
    <div className="login-container"> 
      <h2 className="login-title">Register</h2>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form onSubmit={handleRegistration} className="login-form">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">Register</button>
        <div className="navigate-login">
          <button onClick={onNavigateToLogin} className="register-button">Already have an account? Log in</button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationPage;