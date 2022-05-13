import React from 'react';
import styles from "./Comments.module.css";

export default function Comment(props) {
  return (
    <div className={styles.comment}>
        <div className={styles.date}>
            {props.date}
        </div>
        <div className={styles.score}>
            {props.score}
        </div>
        <div className={styles.content}>
            {props.content}
        </div>
    </div>
  )
}
