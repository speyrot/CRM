// App.js
import React, { useState, useEffect, useRef } from 'react';
import LoginPage from './components/Login/LoginPage';
import RegistrationPage from './components/Registration/Register'; 
import Dashboard from './components/DashBoard/DashBoard';
import NavBar from './components/Navigation/NavBar'; 
import './App.css'; 

function App() {
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('login'); 
  const sidebarRef = useRef();

  useEffect(() => {
    fetch('/api/auth/current_user', {
      credentials: 'include',
    })
    .then(response => response.json())
    .then(data => {
      if (data.isAuthenticated) {
        setUser(data.user);
        setCurrentPage('dashboard'); 
      }
    })
    .catch(error => console.error('Error fetching auth status:', error));
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false); 
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarRef]);

  const navigateTo = (page) => () => {
    setCurrentPage(page);
  };

  return (
    <div className="body-wrapper">
      {user ? (
        <>
          <NavBar setIsSidebarOpen={setIsSidebarOpen} isSidebarOpen={isSidebarOpen} sidebarRef={sidebarRef} />
          <div className={`content-wrapper ${isSidebarOpen ? 'sidebar-open' : ''}`}>
            <Dashboard user={user} />
          </div>
        </>
      ) : currentPage === 'login' ? (
        <LoginPage onLoginSuccess={setUser} onNavigateToRegistration={navigateTo('register')} />
      ) : (
        <RegistrationPage onNavigateToLogin={navigateTo('login')} />
      )}
    </div>
  );
}

export default App;