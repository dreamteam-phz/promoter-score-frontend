import React from "react";
import "chart.js/auto";
import { Pie } from "react-chartjs-2";

const RespondersChart = ({ promoters, detractors, passives }) => {
  const labels = ["Promoters", "Detractors", "Passives"],
    datasets = [
      {
        data: [promoters, detractors, passives],
        backgroundColor: ["#1D4E89", "#0092AE", "#7DCFB6"],
      },
    ];
  

  return (
    <Pie
      options={{
        width: "200",
        height: "200",
      }}
      data={{
        labels: labels,
        datasets: datasets,
      }}
    />
  );
};

export default RespondersChart;
