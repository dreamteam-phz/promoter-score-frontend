import React from "react";
import styles from "./Input.module.css";
const Input = (props) => {
  return (
    <div>
      <input className={styles.input} placeholder={props.text} />
    </div>
  );
};

export default Input;
