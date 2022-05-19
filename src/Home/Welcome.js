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
      </div>
        <button><Link to='/home'>EXPLORE</Link></button>
        <div className={styles.developed}>Developed by DreamTeam 2022. Business College Helsinki</div>
    </main>
  )
}
