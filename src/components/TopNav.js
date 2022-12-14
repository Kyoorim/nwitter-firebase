import React from "react";
import { Link } from "react-router-dom";

const TopNav = ({ userObj }) => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/profile">{userObj.displayName}'s profile</Link>
        </li>
      </ul>
    </nav>
  );
};

export default TopNav;
