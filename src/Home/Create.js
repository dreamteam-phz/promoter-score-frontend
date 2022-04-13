import axios from 'axios';
import React, { useState } from 'react'
import styles from "./Create.module.css";
import Label from './Label'

export default function Create() {
  const [data, setData] = useState({});
  const inputHandler = (event) => {
    setData({...data, [event.target.name]: event.target.value});
  }
  const submitHandler = (event) => {
    event.preventDefault();
    axios.post('http://localhost:4000/api/newsurvey', {
      question: data.question,
      name: data.name,
      comment: true
    }).then(res => console.log(res))
    
  } 


  return (
    <div className={styles.create}>
      <div className={styles.data}>
        <h1>CREATE SURVEY</h1>
        <input name='name' type='text' placeholder='Name of survey' onChange={inputHandler} />
        <input name='question' type='text' placeholder='Main question' onChange={inputHandler} />
        <div className={styles.container}>
        <button onClick={submitHandler}>SUBMIT</button>
        </div>
      </div>
    </div>
  )
}
