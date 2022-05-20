import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../components/loader/Loader";
import AnotherSurvey from "./AnotherSurvey";
import styles from "./Create.module.css";

export default function Create() {
  const [data, setData] = useState({ name: "", question: "" });
  const [surveys, setSurveys] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState('');
  const [submittable, setSubmittable] = useState(false);
  const api_url = useSelector((state) => state.api_url);
  const URL_SURVEY_API = api_url + 'surveys';
  // const src = 'http://localhost:3000/'; // for local
  const src = 'https://promoter-score-frontend-ht8wtkb1f-dream-team-backend.vercel.app/'; 
  useEffect(() => loadData(), [isLoading]);
  console.log('src:', src);
  const loadData = () => {
    axios.get(URL_SURVEY_API)
      .then(response => {
        setSurveys(response.data.reverse());
        setIsLoading(false);
      })
      .catch((error) => console.log(error.message));
  }

  const submitHandler = () => {
    if (data.name !== '' && data.question !== '') {
      axios
        .post(api_url + "newsurvey", {
          name: data.name,
          question: data.question,
          comment: true
        })
        .then(res => res.status == 200 ? setResult('Successfully created!') : setResult('Error while creating!'));
      setData({ name: "", question: "" })
      setIsLoading(true)
      setSubmittable(false)
      setInterval(() => {
        setResult('');
      }, 3000);
    }
  };
  const changeHandler = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
    if (data.name !== '' && data.question !== '') {
      setSubmittable(true);
    }
  }

  const deleteHandler = (event) => {
    console.log(event, event.value, event.target.value)
    axios
      .delete(api_url + "delete/survey/" + event.target.id)
      .then(res => console.log(res.status));
    setIsLoading(true)
  }

  return (
    //
    // <label htmlFor="nameInput">survey name<span> *</span></label>
    // <input
    //   id="nameInput"
    //   name="name"
    //   type="text"
    //   placeholder="enter name"
    //   onChange={inputHandler}
    //   value={data.name}
    // />
    //
    <div className={styles.create}>
      <div className={styles.new}>
        <h2>CREATE NEW SURVEY</h2>
        <div className={styles.createContainer}>
          <div className={styles.createContent}>
            <label htmlFor="nameInput">survey name <span> *</span></label>
            <input id="nameInput" onChange={changeHandler} value={data.name} name="name" />
          </div>
          <div className={styles.createContent}>
            <label htmlFor="questionInput">survey question <span> *</span></label>
            <input id="questionInput" onChange={changeHandler} value={data.question} name="question" />
          </div>
          <button onClick={submitHandler} disabled={!submittable}>CREATE</button>
          <p className={styles.response}>{result}</p>
        </div>
      </div>
      <div className={styles.old}>
        <h2>ALL SURVEYS</h2>
        <div className={styles.surveyContainer}>
          {!isLoading && surveys.map(item => {
            return <AnotherSurvey delete={deleteHandler} value={item} id={item._id} key={item._id} name={item.name} question={item.question} link={src + item._id} />
          })}
          {isLoading && <Loader />}
        </div>
      </div>
    </div>
  );
}
