import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-content">
          <div className="logo">
            <Link to="/">📖 Story Diary</Link>
          </div>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/write">Write Story</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;