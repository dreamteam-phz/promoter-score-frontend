import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styles from "./Dashboard.module.css";


export default function Dashboard() {
  const [data, setData] = useState({});

  useEffect(() => {
    axios.get('http://localhost:4000/api/formscores').then(response => {
      setData(response.data);
      console.log(data);
    });
  }, [])


  return (
    <div className={styles.dashboard}>
      <h1>DASHBOARD</h1>
      <div className={styles.data}>
        
      </div>
    </div>
  )
}
