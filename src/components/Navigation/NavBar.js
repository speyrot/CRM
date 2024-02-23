import React from 'react';
import './NavBar.css';
import { IoBarChartOutline, IoPeopleOutline, IoHelpCircleOutline, IoGridOutline, IoConstructOutline, IoChatbubblesOutline, IoNotificationsOutline, IoLogInOutline, IoSearchOutline } from "react-icons/io5";

const Navbar = ({ setIsSidebarOpen, isSidebarOpen }) => {
  return (
    <div className={`sidebar ${isSidebarOpen ? 'expanded' : ''}`} onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
      <div className="menu-icon">
        <IoLogInOutline className="icon" />
      </div>
      {isSidebarOpen && (
        <div className="search-bar">
          {/*<IoSearchOutline className="search-icon"/>*/}
          <input type="text" placeholder="Search here..." />
        </div>
      )}
      <div className="sidebar-section">
        <span className="section-title">Main Menu</span>
        <div className="sidebar-icons">
          <div><IoGridOutline className="icon my-2" /><span className="icon-label">Dashboard</span></div>
          <div><IoBarChartOutline className="icon my-2" /><span className="icon-label">Analytics</span></div>
          <div><IoChatbubblesOutline className="icon my-2" /><span className="icon-label">Outreach</span></div>
          <div><IoPeopleOutline className="icon my-2" /><span className="icon-label">Customers</span></div>
        </div>
      </div>
      <div className="sidebar-section">
        <span className="section-title">Settings</span>
        <div className="sidebar-icons">
          <div><IoNotificationsOutline className="icon my-2" /><span className="icon-label">Notifications</span></div>
          <div><IoConstructOutline className="icon my-2" /><span className="icon-label">Settings</span></div>
          <div><IoHelpCircleOutline className="icon my-2" /><span className="icon-label">Help Center</span></div>
        </div>
      </div>
    </div>
  );
};


export default Navbar;
