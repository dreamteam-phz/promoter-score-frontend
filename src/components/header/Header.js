import React from "react";
import styles from "./Header.module.css";
import NavBar from "../navBar/NavBar";
const Header = () => {
  return (
    <div className={styles.header}>
      <h1>Net Promoter Score</h1>
      <NavBar />
    </div>
  );
};

export default Header;
