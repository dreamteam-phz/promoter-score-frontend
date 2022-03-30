import React from "react";
import classes from "./NavBar.module.css";
import { NavLink } from "react-router-dom";
const NavBar = () => {
  return (
    <ul className={classes.navigation}>
      <li>
        <NavLink className={classes.link} to="/" exact>
          Landing page
        </NavLink>
      </li>

      <li>
        <NavLink className={classes.link} to="/Dashboard">
          Dashboard
        </NavLink>
      </li>
    </ul>
  );
};

export default NavBar;
