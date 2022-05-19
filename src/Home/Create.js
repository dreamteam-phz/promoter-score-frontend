import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AnotherSurvey from "./AnotherSurvey";
import styles from "./Create.module.css";

export default function Create() {
  const [data, setData] = useState({ name: "", question: "" });
  const [surveys, setSurveys] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState('');
  const api_url = useSelector((state) => state.api_url);
  const URL_SURVEY_API = api_url + 'surveys';
  // const src = 'http://localhost:3000/'; // for local
  const src = 'https://62860cdb037adb505a38c39a--eclectic-trifle-b4c620.netlify.app/';

  useEffect(() => loadData(), [isLoading]);

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
      setInterval(() => {
        setResult('');
      }, 3000);
    }
  };
  const changeHandler = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  }
  
  const deleteHandler = (event) => {
    axios
      .delete(api_url + "delete/survey/" + event.target.id)
      .then(res => console.log(res.status));
    setIsLoading(true)
  }

  return (
    <div className={styles.create}>
      <div className={styles.new}>
        <h2>Create new survey</h2>
        <div className={styles.createContainer}>
          <input onChange={changeHandler} value={data.name} name="name" placeholder="Name of survey" />
          <input onChange={changeHandler} value={data.question} name="question" placeholder="Question of survey" />
          <button onClick={submitHandler}>CREATE</button>
          <p className={styles.response}>{result}</p>
        </div>
      </div>
      <div className={styles.old}>
        <h2>All surveys</h2>
        <div className={styles.surveyContainer}>
          {!isLoading && surveys.map(item => {
            return <AnotherSurvey delete={deleteHandler} id={item._id} key={item._id} name={item.name} question={item.question} link={src + item._id} />
          })}
        </div>
      </div>
    </div>
  );
}
