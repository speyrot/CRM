import React, { useState } from 'react';
import './LoginPage.css'; // Ensure you import the CSS file

function LoginPage({ onLoginSuccess, onNavigateToRegistration }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    fetch('http://localhost:3500/api/auth/login', {
      method: 'POST',
      credentials: 'include', // Important for sessions
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        onLoginSuccess(data.user);
      } else {
        setErrorMessage('Invalid credentials');
      }
    })
    .catch(error => {
      console.error('Error logging in:', error);
      setErrorMessage('Server error during login');
    });
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <label>Username:</label>
          <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <button type="submit" className="login-button">Login</button>
        <div className="navigate-register">
          <button onClick={onNavigateToRegistration} className="register-button">Don't have an account? Register</button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;