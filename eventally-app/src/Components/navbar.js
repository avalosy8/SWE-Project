import React, {useContext} from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/navbar.css';
import signOut from '../helperFunctions';
import {GlobalContext} from '../Context/GlobalContext'

const Navbar = () => {
  const {user} = useContext(GlobalContext);

  return(
  <nav className="navbar">
    <NavLink
      exact
      activeClassName="navbar__link--active"
      className="navbar__link"
      to="/"
    >
      Home
    </NavLink>
    {user && 
      <NavLink
      activeClassName="navbar__link--active"
      className="navbar__link"
      to="/events"
      >
        Events
      </NavLink>
    }

    {user && 
      <NavLink
      activeClassName="navbar__link--active"
      className="navbar__link"
      to="/points"
      >
        Points
      </NavLink>
    }

    {user && 
      <NavLink
      activeClassName="navbar__link--active"
      className="navbar__link"
      to="/"
      onClick={signOut}
      >
        Logout
      </NavLink>
    }
    {/* { !user &&

    } */}
  </nav>
)};

export default Navbar;