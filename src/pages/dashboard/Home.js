import React from "react";
import styles from "./Dashboard.module.css";
import Button from "../../components/button/Button";

const Dashboard = () => {
  return (
    <div className={styles.main}>
      <div className={styles.menuContainer}>
        Menu
        <div className={styles.subMenu}>
          <Button />
        </div>
        <div className={styles.subMenu}>
          <Button />
        </div>
        <div className={styles.subMenu}>
          <Button />
        </div>
        <div className={styles.subMenu}>
          <Button />
        </div>
      </div>
      <div className={styles.bodyContainer}>Body</div>
      <div className={styles.activityContainer}>Activities</div>
    </div>
  );
};

export default Dashboard;
