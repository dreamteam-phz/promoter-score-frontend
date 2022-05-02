import React from "react";
import "chart.js/auto";
import { Doughnut, Pie, getElementAtEvent } from "react-chartjs-2";
import { useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";


const RespondersChart = () => {
  const scoreData = useSelector(state => state.dashboard.scoreData);
  const labels = ["Promoters", "Detractors", "Passives"]
  const datasets = [
    {
      data: [scoreData.promoters, scoreData.detractors, scoreData.passives],
      backgroundColor: ["#1D4E89", "#0092AE", "#7DCFB6"],
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

  //doughnut chart plugin 
  //https://www.youtube.com/watch?v=tx5kw9KAhEA
  const centerScoreValue = {
    id: 'doughnutScoreValue',

    afterDraw(chart, args, options) {
      const { ctx, chartArea: { width, height } } = chart;
      //ctx.save();
      ctx.font = "50px Lato,sans-serif";
      ctx.fillStyle = '#545454';
      ctx.textAlign = 'center';
      //ctx.center = 'center';
      ctx.fillText(`${scoreData.promScore}`, chart.chartArea.width / 2, (chart.chartArea.height / 2) + 20);
      //ctx.restore();
    }
  }


  //responsive chart 
  //https://www.chartjs.org/docs/latest/configuration/responsive.html 
  // note! https://www.chartjs.org/docs/latest/configuration/responsive.html#important-note

  return (
    <Doughnut
      ref={chartRef}
      options={{
        cutout: 95,
        plugins: {
          legend: {
            display: false
            // position: "bottom",
            // labels: {
            //   fontColor: "#545454",
            // },
          },
        }
        //   width: "235", height: "279",
        //animation: false // how animation can be turned off 
      }}
      legend={{
        display: true,
        position: "right",
        align: "center",
        labels: {
          usePointStyle: true,
          fontColor: "#006192",
        },
      }}

      plugins={
        [centerScoreValue]
      }

      data={{ labels: labels, datasets: datasets }}
      onClick={clickHandler} />
  );
};

export default RespondersChart;
