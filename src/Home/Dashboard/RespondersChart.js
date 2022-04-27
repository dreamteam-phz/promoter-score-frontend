import React from "react";
import "chart.js/auto";
import { Pie, getElementAtEvent } from "react-chartjs-2";
import { useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";


const RespondersChart = () => {
  const scoreData = useSelector(state => state.dashboard.scoreData);
  const labels = ["Promoters", "Detractors", "Passives"],
    datasets = [
      {
        data: [scoreData.promoters, scoreData.detractors, scoreData.passives],
        backgroundColor: ["#1D4E89", "#0092AE", "#7DCFB6"],
      },
    ];
  const dispatch = useDispatch();
  const chartRef = useRef();
  const clickHandler = (event) => {
    dispatch({
      type: 'DASHBOARD',
      payload: {comments: labels[getElementAtEvent(chartRef.current, event)[0].index]}
    });
  }

  return (
    <Pie
      ref={chartRef}
      options={{ width: "300", height: "300" }}
      data={{ labels: labels, datasets: datasets }}
      onClick={clickHandler} />
  );
};

export default RespondersChart;
