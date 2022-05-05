import React from "react";
import classes from "./NavBar.module.css";
import { NavLink } from "react-router-dom";
const NavBar = () => {
  return (
    <ul className={classes.navigation}>
      <li>
        <NavLink className={classes.link} to="/" exact>
          Home
        </NavLink>
      </li>

      <li>
        <NavLink className={classes.link} to="/Survey">
          Create survey
        </NavLink>
      </li>
      <li>
        <NavLink className={classes.link} to="/Surveys">
          Surveys
        </NavLink>
      </li>
      <li>
        <NavLink className={classes.link} to="/Dashboard">
          Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink className={classes.link} to="/Instructions">
          Instructions
        </NavLink>
      </li>
    </ul>
  );
};

export default NavBar;
