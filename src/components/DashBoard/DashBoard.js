import React from 'react';
import './Dashboard.css'; // Ensure this path is correct based on your project structure

function Dashboard({ user, isSidebarOpen }) {
  // Placeholder data
  const recentContacts = [
    { id: 1, name: 'Alice Smith', email: 'alice@example.com' },
    { id: 2, name: 'Bob Johnson', email: 'bob@example.com' },
  ];

  const tasks = [
    { id: 1, task: 'Follow up with Alice', dueDate: '2024-02-25' },
    { id: 2, task: 'Send proposal to Bob', dueDate: '2024-02-26' },
  ];

  return (
    <div className={`dashboard-container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      <div className="dashboard-main">
        <h1>Hello, {user.username}!</h1>
        <section>
          <h2>Recent Contacts</h2>
          <ul>
            {recentContacts.map(contact => (
              <li key={contact.id}>{contact.name} - {contact.email}</li>
            ))}
          </ul>
        </section>
        <section>
          <h2>Upcoming Tasks</h2>
          <ul>
            {tasks.map(task => (
              <li key={task.id}>{task.task} - Due {task.dueDate}</li>
            ))}
          </ul>
        </section>
        {/* More sections as needed */}
      </div>
    </div>
  );
}

export default Dashboard;
