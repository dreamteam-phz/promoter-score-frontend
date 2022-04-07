import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./Dashboard.module.css";
import PeriodFilter from "./PeriodFilter";
import ScoreChart from "./ScoreChart";
import { testData } from "./data";
import Label from "../Label";

export default function Dashboard() {
  const [chosenPeriod, setChosenPeriod] = useState("6");
  const extractPeriodHandler = (period) => {
    setChosenPeriod(period);
  };
  const [data, setData] = useState({
    labels: testData.map((item) => item.month),
    datasets: [{ label: "nps", data: testData.map((item) => item.promoters) }],
  });
  const filteredData = (testData) => {
    for (let i = testData.length - 1; i <= chosenPeriod; i--) {
      return testData.nps;
    }
  };

  const dispatch = useDispatch();
  const labelHandler = (event) => {
    dispatch({
      type: "DASHBOARD",
      payload: event.target.value,
    });
    console.log(event.target.value);
  };
  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h1>DASHBOARD</h1>
        <PeriodFilter selected={chosenPeriod} onFilter={extractPeriodHandler} />
      </div>

      <div className={styles.data}>
        {/* {console.log(chosenPeriod)} */}

        <ScoreChart score={data} />
      </div>
    </div>
  );
}
