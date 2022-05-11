import React from "react";
import "chart.js/auto";
import { Doughnut, getElementAtEvent } from "react-chartjs-2";
import { useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import styles from './Dashboard.module.css';


const RespondersChart = () => {
  const scoreData = useSelector(state => state.dashboard.scoreData);
  const labels = ["Promoters", "Detractors", "Passives", "some"]
  console.log("scoreData is", scoreData)
  const datasets = [
    {
      data: [scoreData.promoters, scoreData.detractors, scoreData.passives],
      backgroundColor: ["#1D4E89", "#0092ae", "#7DCFB6"],
    },
  ];
  const dispatch = useDispatch();
  const chartRef = useRef();

  const clickHandler = (event) => {
    event.preventDefault();
    dispatch({
      type: 'DASHBOARD',
      payload: { comments: labels[getElementAtEvent(chartRef.current, event)[0].index] }
    });
  }

  return (
    <div className={styles.doughnutWrap}>
      <Doughnut
        ref={chartRef}
        options={{
          cutout: 130,
          width: "100px",
          height: 200,
          plugins: {
            legend: {
              display: false
            }
          }
        }}
        data={{ labels: labels, datasets: datasets }}
        onClick={clickHandler}
      />
      <p id={styles.score} className={styles.centerValue}>{scoreData.promScore}</p>
    </div>
  );
};

export default RespondersChart;
