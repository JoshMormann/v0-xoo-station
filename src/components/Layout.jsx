import React from 'react';
import '../styles/main.scss';

const Layout = ({ children }) => {
  return (
    <div className="app-container">
      <div className="discovery-section">
        {children[0]}
      </div>
      <div className="performance-section">
        {children[1]}
      </div>
    </div>
  );
};

export default Layout; 