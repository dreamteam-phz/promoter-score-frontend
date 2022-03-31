import React from "react";
import styles from "./Input.module.css";
const Input = (props) => {
  return (
    <div>
      <input
        className={styles.input}
        placeholder={styles.text}
        name={props.name}
      />
    </div>
  );
};

export default Input;
