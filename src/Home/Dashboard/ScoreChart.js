import React from "react";
import { Bar } from "react-chartjs-2";
const ScoreChart = (props) => {
  return <Bar data={props.score} />;
};

export default ScoreChart;
