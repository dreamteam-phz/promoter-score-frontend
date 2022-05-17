import React from "react";
import styles from "./Console.module.css";
import { useSelector } from "react-redux";
import Create from "./Create";
import Dashboard from "./Dashboard/Dashboard";
import Instructions from "./Instructions";

export default function Console() {
  const location = useSelector((state) => state.location);
  switch (location) {
    case "create":
      return (
        <div className={styles.surveyConsole}>
          <Create />
        </div>
      );
    case "dashboard":
      return (
        <div className={styles.console}>
          <Dashboard />
        </div>
      );
    case "instructions":
      return (
        <div className={styles.console}>
          <Instructions />
        </div>
      );
    default:
      return (
        <div className={styles.console}>
          <Dashboard />
        </div>
      );
  }
}
