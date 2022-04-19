import axios from "axios";
import React, { useEffect, useState } from "react";

import styles from "./Dashboard.module.css";
import RespondersChart from "./RespondersChart";
import DisplayFilter from "./DisplayFilter";
import PromoterScore from "./PromoterScore";
import PromMonthlyChart from "./PromMonthlyChart";
import PromMonthlyBars from "./PromMonthlyBars";
import PromoterScoreChart from "./PromoterScoreChart";

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
        <PromoterScore
          data={data}
          promScore={promScore}
          month={selectedMonth}
        />
        <PromMonthlyChart data={data} promScore={promScore} />
        <PromoterScoreChart
          data={data}
          promoters={prom}
          detractors={det}
          passives={pass}
        />
        <PromMonthlyBars data={data} promScore={promScore} />
      </div>
    </div>
  );
}
