import React from 'react'
import styles from "./Welcome.module.css";
import logo from '../img/graph.png'
import { Link } from 'react-router-dom';


export default function Welcome() {
  return (
    <main>
      {/* <h1 className={styles.mainTitle}>NPS</h1> */}
      <div className={styles.logo}>
        <img className={styles.logo} src={logo} />
        <h1>Survey</h1>
      </div>
      <div className={styles.login}>
        <button><Link to='/home'>Submit</Link></button>
      </div>
    </main>
  )
}
