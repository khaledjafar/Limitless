import React, { useState } from 'react';
import './styles.css';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button className="toggle-sidebar" onClick={toggleSidebar}>
        {isOpen ? '✖' : '☰'}
      </button>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
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
