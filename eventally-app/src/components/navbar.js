import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/navbar.css';
import logo from '../components/images/logo.png';

const Navbar = () => (
  <nav className="navbar">
    <div className="logo">
      <img src={logo} alt="WECE Logo" />
    </div>

    <div className="links">
        <NavLink
          exact
          activeClassName="navbar__link--active"
          className="navbar__link"
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          activeClassName="navbar__link--active"
          className="navbar__link"
          to="/events"
        >
          Events
        </NavLink>
        <NavLink
          activeClassName="navbar__link--active"
          className="navbar__link"
          to="/points"
        >
          Points
        </NavLink>
        

        </div>
        <div className="logout">
        <NavLink
          activeClassName="navbar__link--active"
          className="navbar__link"
          to="/logout"
        >
          Logout
        </NavLink>

        </div>
  </nav>
);

export default Navbar;