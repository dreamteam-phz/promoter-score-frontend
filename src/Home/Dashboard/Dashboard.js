import axios from "axios";
import React, { useEffect, useState } from "react";

import styles from "./Dashboard.module.css";
import DisplayFilter from "./DisplayFilter";
import PromoterScore from "./PromoterScore";
import PromMonthlyChart from "./PromMonthlyChart";
import Comments from "./Comments";
import PromoterScoreChart from "./PromoterScoreChart";
import { dateHelper } from "../../helpers/DateHelper";
import { useDispatch, useSelector } from "react-redux";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [scores, setScores] = useState([]);
  const [comments, setComments] = useState();
  const [selectedMonth, setSelectedMonth] = useState("180");
  const [extractedDate, setExtractedDate] = useState([]);
  const dispatch = useDispatch();
  const dashboard = useSelector((state) => state.dashboard);
  console.log(dashboard);
  const filterChangeHandler = (month) => {
    dispatch({
      type: 'DASHBOARD',
      payload: {selectedMonth: month}
    });
  };
  useEffect(() => {
    axios.get("http://localhost:4000/api/formscores").then((response) => {
      setScores(response.data[0].results.map((item) => item.score));
      setData(response.data[0].results);
      setComments(response.data[0].results.map((item) => item.comment));
      const month = response.data[0].results.map((item) => item.date);
      setExtractedDate(month);
      const currDate = new Date();

      // console.log(currDate.getMonth());
      // console.log(
      //   (currDate - Date.parse("2022-03-19T00:00:00.502Z")) / 86400000
      // );
      // console.log(new Date(currDate) - new Date("2022-02-19T00:00:00.502Z"));
    });
  }, []);
  // console.log(comments);
  // NetPromScore logic
  const dummyData = [
    {
      date: "2022-01-19T00:00:00.502Z",
    },
    {
      date: "2022-02-19T00:00:00.502Z",
    },
    {
      date: "2022-03-19T00:00:00.502Z",
    },
    {
      date: "2022-04-19T00:00:00.502Z",
    },
    {
      date: "2021-09-19T00:00:00.502Z",
    },
  ];
  // const dataToDisplay = dummyData.filter((item) => {
  //   return dateHelper(item.date, selectedMonth);
  // });
  // console.log(dataToDisplay);

  let prom = 0;
  let det = 0;
  let pass = 0;
  for (let score of scores) {
    if (score >= 9) prom++;
    else if (score <= 6) det++;
  }
  pass = data.length - (prom + det);
  const result = ((prom - det) / data.length) * 100;
  const promScore = Math.floor(result);
  // console.log(extractedDate);
  return (
    <div className={styles.dashboard}>
      <h1>DASHBOARD</h1>
      <DisplayFilter selected={dashboard.selectedMonth} onFilter={filterChangeHandler} />
      <div className={styles.data}>
        <PromoterScore
          score={scores}
          promScore={promScore}
          month={dashboard.selectedMonth}
        />
        <PromMonthlyChart score={scores} promScore={promScore} />
        <PromoterScoreChart
          score={scores}
          promoters={prom}
          detractors={det}
          passives={pass}
        />
        <Comments data={data} />
      </div>
    </div>
  );
}
