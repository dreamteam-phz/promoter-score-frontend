import axios from "axios";
import React, { useState, useEffect } from "react";
import styles from "./Create.module.css";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import { CSSTransition } from 'react-transition-group'; // ES6
import "../animation.css";
import { useDispatch, useSelector } from "react-redux";

import { CopyToClipboard } from 'react-copy-to-clipboard';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
// import { lowerFirst } from "cypress/types/lodash";
import SurveyLine from "./SurveyLine"
import Loader from "../components/loader/Loader"


export default function Create() {
  const [data, setData] = useState({ name: "", question: "", comment: true });

  const [justCreatedData, setJustCreatedData] = useState({ name: "", question: "" });
  const [linkToForm, setLinkToForm] = useState("");
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [selectSurvey, setSelectSurvey] = useState([]);
  const [display, setDisplay] = useState(false);
  const [submittable, setSubmittable] = useState(false);

  const URL_SURVEY_API = 'http://localhost:4000/api/surveys';
  const iFrameSRC = `src = "http://localhost:3000/`;
  const iFrameSettings = `frameborder="0" width="100%" height="500px"`

  const dispatch = useDispatch();

  useEffect(() => {
    setDisplay(true);
    axios.get(URL_SURVEY_API)
      .then(response => {
        const data = response.data;
        console.log(data, "in create")
        dispatch({
          type: "SURVEYS",
          payload: { surveyItems: data },
        });
        setIsLoading(false);
      })
      .catch((error) => console.log(error.message));
  }, []);

  const rerender = () => {
    setIsLoading(true);
    axios.get(URL_SURVEY_API)
      .then(response => {
        const data = response.data;
        console.log(data, "in re - create");
        dispatch({
          type: "SURVEYS",
          payload: { surveyItems: data },
        });
        setIsLoading(false);
      })
      .catch((error) => console.log(error.message));
  }

  // // snackbar 
  // const handleToClose = (event, reason) => {
  //   if ("clickaway" === reason) return;
  //   setOpen(false);
  // };
  useEffect(() => {
    data.name !== "" && data.question !== "" ? setSubmittable(true) : setSubmittable(false)
  }, [data]);

  const inputHandler = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
    setJustCreatedData({ name: "", question: "" })
    setOpen(false);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setIsLoading(true)
    setJustCreatedData({ name: "", question: "" })
    axios
      .post("http://localhost:4000/api/newsurvey", {
        name: data.name,
        question: data.question,
        comment: true,
      })
      .then((res) => {
        dispatch
          ({
            type: "SURVEYS",
            payload: { linkToSurvey: res.data._id },
          })
        setJustCreatedData({ name: data.name, question: data.question })
        setLinkToForm(res.data._id);
        setIsLoading(false);
        setOpen(true);
      });
    setData({ question: "", name: "" });

  };

  const copyHandler = (event) => {
    event.preventDefault();
    navigator.clipboard.writeText(event.currentTarget.value);
  };


  // if (linkToForm === "") 
  //{
  return (
    <div className={styles.createWrapper}>
      {/* // <CSSTransition in={display} timeout={1000} classNames="my-node"> */}
      {/* <div className={styles.create}> */}
      <div className={styles.createContainer}>
        <h2>CREATE new SURVEY</h2>
        <div className={styles.createContent}>

          <label htmlFor="nameInput">Name of survey <span> *</span></label>
          <input
            id="nameInput"
            name="name"
            type="text"
            placeholder="enter name"
            onChange={inputHandler}
            value={data.name}
          />
          <label htmlFor="questionInput">Question for survey<span> *</span></label>
          <input
            id="questionInput"
            name="question"
            type="text"
            placeholder="enter question"
            onChange={inputHandler}
            value={data.question}
          />
          {/* <div className={styles.container}> */}
          <button onClick={submitHandler} disabled={!submittable}>SUBMIT</button>
          {open &&
            <div className={styles.createSurveyDetails}>

              <p>{justCreatedData.name}</p>
              <p>{justCreatedData.question}</p>
              <p>{`http://localhost:3000/${linkToForm}`}</p>
              <p>{`<iframe 
                src="http://localhost:3000/${linkToForm}" 
                frameborder="0" 
                width="100%" 
                height="500px" 
              ></iframe>`}</p>

            </div>}
          {/* <Snackbar
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
          /> */}
          {/* </div> */}
        </div>
        {/* </div> */}
      </div >

      <SurveyLine></SurveyLine>
      {/* </CSSTransition> */}
    </div >

  );
}
