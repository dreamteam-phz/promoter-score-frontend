import React, { useState } from 'react'
import styles from "./Create.module.css";
import { FaTrashAlt } from "react-icons/fa";


export default function AnotherSurvey(props) {
  const iFrame = `<iframe src="${props.link}" frameborder="0" width="100%" height="500px" />`
  const [copyButton, setCopyButton] = useState('COPY IFRAME')

  const copyHandler = (event) => {
    navigator.clipboard.writeText(event.currentTarget.id);
    setCopyButton('COPIED')
    setInterval(() => setCopyButton('COPY IFRAME'), 3000);
  };

  return (
    <div className={styles.survey}>
      <div className={styles.pWrapper}>
        <p><b>{props.name}</b></p>
        <p>{props.question}</p>
      </div>
      <div className={styles.links}>
        <a href={props.link} target='_blank'>OPEN</a>
        <a className={copyButton} href='#' onClick={copyHandler} id={iFrame}>{copyButton}</a>
      </div>

      <button id={props.id} onClick={props.delete}><FaTrashAlt className={styles.deleteButton} /></button>

    </div>
  )
}
