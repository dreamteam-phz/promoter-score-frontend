import axios from "axios";
import React, { useState, useEffect } from "react";
import styles from "./Create.module.css";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import {CSSTransition} from 'react-transition-group'; // ES6
import "../animation.css";
import {CopyToClipboard} from 'react-copy-to-clipboard';

export default function Create() {
  const [data, setData] = useState({ name:"",question: "", comment: true });
  const [linkToForm, setLinkToForm] = useState("");
  const [open, setOpen] = useState(false);
  const URL_SURVEY_API = 'http://localhost:4000/api/surveys';
  const [selectSurvey, setSelectSurvey] = useState([]);
  const [display, setDisplay] = useState(false);

  const [clipboard,setClipboard] = useState('');

  useEffect (() => {
    setDisplay(true);
    axios.get(URL_SURVEY_API)
      .then(response => {
        const data = response.data;
        setSelectSurvey(data);
      })
      .catch((error)=> console.log(error.message));
  },[]);

  
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
      name: data.name,
      question: data.question,
      comment: true,
    })
    .then((res) => {
      console.log(res);
      setLinkToForm(res.data._id);
    });
    setData({ question: "", name: "" });
    setOpen(true);
  };
  
  const copyHandler = (event) => {
    setClipboard(`<iframe src="http://localhost:3000/${linkToForm}" frameborder="0" width="100%" height="500px" ></iframe>`);
    console.log(clipboard);
  };

  if (linkToForm === "") {
    return (
      <CSSTransition in={display} timeout={1000} classNames="my-node">
      <div className={styles.create}>
        <div className={styles.data}>
          <h1>CREATE SURVEY</h1>
          <input
            name="name"
            type="text"
            placeholder="Name of survey"
            onChange={inputHandler}
            value={data.name}
          />
          <input
            name="question"
            type="text"
            placeholder="Enter your question"
            onChange={inputHandler}
            value={data.question}
          />
          <div className={styles.container}>
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
      </CSSTransition>
    );
  } else {
    return (
      <CSSTransition in={display} timeout={0} classNames="my-node">
      <div className={styles.formLink}>
        <div className={styles.formLink}>
          <label>URL of the form:</label>
          <span className={styles.span}>{`http://localhost:3000/${linkToForm}`}</span>
          <button className={styles.button}>
            <a href={`http://localhost:3000/${linkToForm}`} target="_blank" rel="noreferrer">Link to the form</a>
          </button>
        </div>
        <div className={styles.formLink}>
          <label>iframe html code:</label>
          <span
            className={styles.span}
          >{`<iframe 
                src="http://localhost:3000/${linkToForm}" 
                frameborder="0" 
                width="100%" 
                height="500px" 
              ></iframe>`}</span>
          <CopyToClipboard text={clipboard}>
            <button className={styles.button} onClick={copyHandler}>
              Copy html to clipboard
            </button>
          </CopyToClipboard>
        </div>
        <div>
        <button className={styles.button} onClick={ () => setLinkToForm('')}>
          Previous
        </button>

        </div>
      </div>
      </CSSTransition>
    );
  }
}
