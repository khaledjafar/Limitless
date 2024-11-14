import React, { useState } from 'react';
import './styles.css';

function Sidebar() {
  // State to control whether the sidebar is open
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle sidebar visibility
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button className="toggle-sidebar" onClick={toggleSidebar}>
        ☰ 
      </button>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <button className="close-sidebar" onClick={toggleSidebar}>
          ✖
        </button>
        <nav>
          <ul>
            <li><a href="#Projects">Projects</a></li>
            <li><a href="#Footer">About</a></li>
            <li><a href="#Footer">Contacts</a></li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Sidebar;
