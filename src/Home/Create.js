import axios from "axios";
import React, { useState } from "react";
import styles from "./Create.module.css";
import Label from "./Label";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";

export default function Create() {
  const [data, setData] = useState({ question: "", comment: true });
  const [linkToForm, setLinkToForm] = useState("");
  const [open, setOpen] = useState(false);
  const handleToClose = (event, reason) => {
    if ("clickaway" === reason) return;
    setOpen(false);
  };
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
      .then((res) => {
        console.log(res);
        setLinkToForm(res.data._id);
      });
    setData({ question: "" });
    setOpen(true);
  };
  if (linkToForm === "") {
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
            <Snackbar
              anchorOrigin={{
                horizontal: "center",
                vertical: "top",
              }}
              open={open}
              autoHideDuration={3000}
              message="Survey created"
              onClose={handleToClose}
              action={
                <React.Fragment>
                  <IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={handleToClose}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </React.Fragment>
              }
            />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.formLink}>
        <label>Link to the form:</label>
        <span
          className={styles.span}
        >{`http://localhost:3000/${linkToForm}`}</span>
        <button className={styles.button}>
          <a
            href={`http://localhost:3000/${linkToForm}`}
            target="_blank"
            rel="noreferrer"
          >
            Link to the form
          </a>
        </button>
      </div>
    );
  }
}
