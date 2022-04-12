import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/api/formscores").then((response) => {
      // setData(response.data);
      setData(response.data[0].results.map((item) => item.score));

      // console.log(response.data);
    });
  }, []);

  // NetPromScore logic
  let prom = 0;
  let det = 0;
  let pass = 0;
  for (let score of data) {
    if (score >= 9) prom++;
    else if (score <= 6) det = det + 1;
  }
  pass = data.length - (prom + det);
  console.log("passives: " + pass);
  console.log("promoters: " + prom);
  console.log("detractors: " + det);
  console.log("Total: " + data.length);
  const result = ((prom - det) / data.length) * 100;
  const promScore = result.toFixed(2);
  console.log("Score: " + promScore);

  // console.log(data);
  // data.map((item) => console.log(item.results));
  return (
    <div className={styles.dashboard}>
      <h1>DASHBOARD</h1>
      <div className={styles.data}>
        {data.length > 0 ? promScore : <p>No data to display</p>}
        <div>{data.length}</div>
      </div>
    </div>
  );
}
