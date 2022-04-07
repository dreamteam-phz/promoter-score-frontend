import React, { useEffect, useState } from "react";
import styles from "./Form.module.css";
import Label from "../components/form/Label";
import axios from "axios";
import { useParams } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";

const Form = () => {
  const [form, setForm] = useState({ score: "", comment: "" });
  const [open, setOpen] = useState(false);
  const handleToClose = (event, reason) => {
    if ("clickaway" === reason) return;
    setOpen(false);
  };
  const [survey, setSurvey] = useState({
    question:
      "Would you recomend PHZ Full Stack for your friends as an employer?",
    comment: true,
  });
  const params = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/surveys/" + params.id)
      .then((response) => {
        console.log(response.data);
        setSurvey(response.data);
      });
  }, []);

  useEffect(() => {
    getIP();
  }, []);
  const getIP = () => {
    axios
      .get("https://api.my-ip.io/ip")
      .then((response) => setForm({ ...form, ip: response.data }));
  };

  const textAreaHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const scoreHandler = (event) => {
    setForm({ ...form, [event.target.name]: +event.target.value });
  };
  const labelsToDisplay = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => {
    return <Label key={item} id={item} change={scoreHandler} content={item} />;
  });
  // check console when pressing submit form
  const submitHandler = (event) => {
    event.preventDefault();
    axios
      .patch("http://localhost:4000/api/update/" + params.id, {
        results: [form],
      })
      .then((response) => {
        console.log(response);
      });
    setForm({ score: "", comment: "" });

    setOpen(true);
  };

  return (
    <>
      <div className={styles.main}>
        <div className={styles.title}>
          <h1>NPS Survey Form</h1>
          <p>
            Questions marked with <sup>*</sup> are required
          </p>
        </div>
        <div className={styles.question}>
          <p>
            {survey.question}
            <sup>*</sup>
          </p>
        </div>

        <div className={styles.tool}>{labelsToDisplay}</div>
        <div className={styles.describers}>
          <p>not likely at all</p>
          <p>extreamly likely</p>
        </div>
        {survey.comment && (
          <div className={styles.precomment}>
            <p>
              What is the main reason for your score?<sup>*</sup>
            </p>
          </div>
        )}
        {survey.comment && (
          <textarea
            onChange={textAreaHandler}
            name="comment"
            rows="6"
            cols="30"
            placeholder="type your message here"
            value={form.comment}
          />
        )}

        <button onClick={submitHandler} className={styles.button}>
          Submit
        </button>
        <Snackbar
          anchorOrigin={{
            horizontal: "center",
            vertical: "top",
          }}
          open={open}
          autoHideDuration={3000}
          message="Thank you for your answer! We appreciate your time!"
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
    </>
  );
};

export default Form;
