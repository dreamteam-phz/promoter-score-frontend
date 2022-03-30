import React from "react";
import styles from "./Footer.module.css";
import { SiGithub } from 'react-icons/si';
const Footer = () => {
  return <div>
    <footer className={styles.footer}>
      <p>Dream Team. &copy; 2022. <strong><a href="https://github.com/dreamteam-phz"><SiGithub/></a></strong></p>
    </footer>
  </div>;
};

export default Footer;
