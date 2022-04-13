import axios from "axios";
import React, { useEffect, useState } from "react";

import styles from "./Dashboard.module.css";
import RespondersChart from "./RespondersChart";

export default function Dashboard() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:4000/api/formscores").then((response) => {
      setData(response.data[0].results.map((item) => item.score));
    });
  }, []);

  // NetPromScore logic

  let prom = 0;
  let det = 0;
  let pass = 0;
  for (let score of data) {
    if (score >= 9) prom++;
    else if (score <= 6) det++;
  }
  pass = data.length - (prom + det);
  // console.log("passives: " + pass);
  // console.log("promoters: " + prom);
  // console.log("detractors: " + det);
  // console.log("Total: " + data.length);
  const result = ((prom - det) / data.length) * 100;
  const promScore = Math.floor(result);

  // console.log("Score: " + promScore);
  // console.log(promScore);

  return (
    <div className={styles.dashboard}>
      <h1>DASHBOARD</h1>
      <div className={styles.data}>
        <div className={styles.panel}>
          <div className={styles.resultWraper}>
            <h3>Promoter Score</h3>
            <span>
              {data.length > 0 ? promScore : <p>No data to display</p>}
            </span>
          </div>
        </div>

        <div className={styles.panel}>
          {data.length > 0 ? (
            <div className={styles.respondersWraper}>
              <RespondersChart
                promoters={prom}
                detractors={det}
                passives={pass}
              />
              <div className={styles.resultWraper}>
                <h4>Total responders</h4>
                <span>{data.length}</span>
              </div>
            </div>
          ) : (
            <div className={styles.resultWraper}>
              <h4>Total responders</h4>
              <span>{data.length}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
