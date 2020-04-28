import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div
      style={{ 
        width: "100vw", 
        height: "10vh",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: "#FAFAFA",
        borderBottom: "solid 1px #E1E1E1",
        marginBottom: "1rem",
        padding: "0 2rem",
      }}
    >
      <Link to="/profile">Profile</Link>
    </div>
  );
}

export default Header;