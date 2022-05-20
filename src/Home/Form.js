import React, { useEffect, useState } from "react";
import styles from "./Form.module.css";
import Label from "../components/form/Label";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "../components/loader/Loader";
import AccessDenied from "./AccessDenied";
import EndMessage from "./EndMesage";
import { useSelector } from "react-redux";

const Form = () => {
  const [accessable, setAccessable] = useState(true);
  const [submittable, setSubmittable] = useState(false);
  const [form, setForm] = useState({ score: "", comment: "" });
  const [survey, setSurvey] = useState({
    question:
      "Would you recommend PHZ Full Stack for your friends as an employer?",
    comment: true,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const params = useParams();
  const api_url = useSelector((state) => state.api_url);

  useEffect(() => {
    cookieChecker();
    if (accessable) getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = () => {
    //setIsLoading(true);
    axios
      .get(api_url + "surveys/" + params.id)
      .then((response) => {
        if (response.status === 200) {
          setSurvey(response.data);
          setIsLoading(false)
        }
        else {
          setTimeout(() => {
            setIsLoading(false)
          }, 800);
          // error message "something wrong" here 
        }
      })
      .catch((error) => {
        if (error) {
          setTimeout(() => {
            setIsLoading(false)
          }, 800);
          // error message "no Database connection" here 
        }
      });
  };

  const textAreaHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const scoreHandler = (event) => {
    console.log(event, "in scoreHandler")
    setForm({ ...form, [event.target.name]: +event.target.value });
    setSubmittable(true);
  };
  const labelsToDisplay = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => {
    return <Label key={item} id={item} change={scoreHandler} content={form.score} />;
  });

  const createError = () => {
    let message = document.createElement('p');
    message.textContent = "you fucked up, come back again later";
    return message;
  }

  // check console when pressing submit form
  const submitHandler = (event) => {
    //setIsLoading(true);
    event.preventDefault();
    axios
      .patch(api_url + "update/" + params.id, {
        results: [form],
      })
      .then((response) => {
        if (response.status === 200) {
          setIsLoading(false);
          // setForm({ score: "", comment: "" });
          accessSetter();
          // 
          setTimeout(() => {
            setShowMessage(true);
          }, 800);
        }
        else {
          setTimeout(() => {
            setIsLoading(false)
          }, 1000);
          // error message "something went wrong" not able to save 
        }
      });
  };
  // when pressing clear it should clear the selections
  const clearHandler = (event) => {
    setForm({ score: "", comment: "" });
  };

  const accessSetter = () => {
    let now = new Date();
    let minutes = 1;
    now.setTime(now.getTime() + minutes * 60 * 1000);
    document.cookie = `name=${params.id}; expires=${now.toUTCString()};`;
  };
  const cookieChecker = () => {
    if (document.cookie === `name=${params.id}`) {
      console.log("cookie is set", document.cookie);
      setAccessable(false);
    }
  };

  if (!accessable) {
    return <AccessDenied />
  }
  else {
    if (isLoading) {
      return <Loader />
    }
    else if (showMessage) {
      return <EndMessage />
    }
    else {
      return (
        <>
          <div className={styles.main + ' ' + styles.desktop}>
            <div className={styles.question}>
              <p>
                {survey.question}
                <span> *</span>
              </p>
            </div>
            <div className={styles.tool}>{labelsToDisplay}</div>
            <div className={styles.describers}>
              <p>not likely at all</p>
              <p>extreamly likely</p>
            </div>
            
              <div className={styles.precomment}>
                <p>Why / Why not? </p>
              </div>
            
            
              <textarea
                onChange={textAreaHandler}
                name="comment"
                rows="6"
                cols="30"
                placeholder="Your message here"
                value={form.comment}
              />
            
            <div className={styles.buttonArea}>
              <button onClick={clearHandler} className={styles.cancelButton} >CLEAR</button>
              <button onClick={submitHandler} className={styles.button} disabled={!submittable}>
                Submit
              </button>
            </div>
          </div>
        </>
      )
    };
  }
};

export default Form;
