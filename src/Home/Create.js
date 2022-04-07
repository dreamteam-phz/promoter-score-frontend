import axios from "axios";
import React, { useState } from "react";
import styles from "./Create.module.css";
import Label from "./Label";

export default function Create() {
  const [data, setData] = useState({ question: "", comment: true });
  const inputHandler = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };
  const submitHandler = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:4000/api/newsurvey", {
        question: data.question,
        comment: data.comment ? true : false,
      })
      .then((res) => console.log(res));
    setData({ question: "" });
  };

  return (
    <div className={styles.create}>
      <div className={styles.data}>
        <h1>CREATE SURVEY</h1>
        <input
          name="question"
          type="text"
          placeholder="Enter your question"
          onChange={inputHandler}
          value={data.question}
        />
        <div className={styles.container}>
          <div className={styles.comment}>
            <Label
              id="on"
              name="comment"
              checked={true}
              content="on"
              change={inputHandler}
            />
            <Label
              id="off"
              name="comment"
              content="off"
              change={inputHandler}
            />
          </div>
          <button onClick={submitHandler}>SUBMIT</button>
        </div>
      </div>
    </div>
  );
}
