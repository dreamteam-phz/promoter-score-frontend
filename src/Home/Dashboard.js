import axios from "axios";
import React, { useEffect, useState } from "react";

import styles from "./Dashboard.module.css";
import RespondersChart from "./RespondersChart";
import DisplayFilter from "./DisplayFilter";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("6");
  const [extractedDate, setExtractedDate] = useState([]);
  const filterChangeHandler = (month) => {
    setSelectedMonth(month);
    // console.log(month + " from dash");
  };
  useEffect(() => {
    axios.get("http://localhost:4000/api/formscores").then((response) => {
      setData(response.data[0].results.map((item) => item.score));
      const date = response.data[0].results.map((item) => item.date);
      setExtractedDate(date.map((item) => console.log(item)));
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
      <DisplayFilter selected={selectedMonth} onFilter={filterChangeHandler} />
      <div className={styles.data}>
        <div className={styles.panel}>
          <div className={styles.resultWraper}>
            <h5>Promoter Score last 6 months</h5>
            <span>
              {data.length > 0 ? promScore : <p>No data to display</p>}
            </span>
          </div>
        </div>
        <div className={styles.panel}>
          <div className={styles.resultWraper}>
            <div className={styles.titleHeader}>
              <h5>Promoter Score Monthly</h5>
            </div>
            <span>
              {data.length > 0 ? promScore : <p>No data to display</p>}
            </span>
          </div>
        </div>

        <div className={styles.panel}>
          {data.length > 0 ? (
            <div className={styles.respondersWraper}>
              <div className={styles.resultWraper}>
                <h5>Total responders</h5>
                <span>{data.length}</span>
              </div>
              <RespondersChart
                promoters={prom}
                detractors={det}
                passives={pass}
              />
            </div>
          ) : (
            <div className={styles.resultWraper}>
              <h4>Total responders</h4>
              <span>{data.length}</span>
            </div>
          )}
        </div>
        <div className={styles.panel}>
          <div className={styles.resultWraper}>
            <div className={styles.titleHeader}>
              <h5>Promoter Score Monthly</h5>
            </div>
            <span>
              {data.length > 0 ? promScore : <p>No data to display</p>}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
