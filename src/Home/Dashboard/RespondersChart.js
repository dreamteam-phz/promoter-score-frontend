import React from "react";
import "chart.js/auto";
import { Pie, getElementAtEvent } from "react-chartjs-2";
import { useRef } from 'react';
import { useDispatch } from "react-redux";


const RespondersChart = ({ promoters, detractors, passives }) => {
  const labels = ["Promoters", "Detractors", "Passives"],
    datasets = [
      {
        data: [promoters, detractors, passives],
        backgroundColor: ["#1D4E89", "#0092AE", "#7DCFB6"],
      },
    ];
  const dispatch = useDispatch();
  const chartRef = useRef();
  const onClick = (event) => {
    dispatch({
      type: 'DASHBOARD',
      payload: {comments: labels[getElementAtEvent(chartRef.current, event)[0].index]}
    });
  }

  return (
    <Pie
      ref={chartRef}
      options={{
        width: "200",
        height: "200",
      }}
      data={{
        labels: labels,
        datasets: datasets,
      }}
      onClick={onClick}
    />
  );
};

export default RespondersChart;
