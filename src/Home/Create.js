import React, { useState } from 'react'
import styles from "./Create.module.css";
import Label from './Label'

export default function Create() {
  const [data, setData] = useState({comment: true});
  const inputHandler = (event) => {
    setData({...data, [event.target.name]: event.target.value});
  }
  const submitHandler = (event) => {
    event.preventDefault();
    console.log(data);
  } 


  return (
    <div className={styles.create}>
      <div className={styles.data}>
        <h1>CREATE SURVEY</h1>
        <input name='question' type='text' placeholder='Enter your question' onChange={inputHandler} />
        <div className={styles.container}>
          <div className={styles.comment}>
            <Label id='on' name='comment' checked={true} content='on' change={inputHandler}/>
            <Label id='off' name='comment' content='off' change={inputHandler}/>
          </div>
          <button onClick={submitHandler}>SUBMIT</button>
        </div>
      </div>
    </div>
  )
}
