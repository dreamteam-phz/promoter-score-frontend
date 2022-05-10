import React from "react";
import "chart.js/auto";
import { Bar, Line } from "react-chartjs-2";
import { useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import styles from './Dashboard.module.css';

const BarChart = () => {
  const data = useSelector(state => state.dashboard.data);
  const scoreData = useSelector(state => state.dashboard.scoreData);



  // playing with dates 
  const days = data.map((item) => item.date);
  console.log("days: ", days);
  const modifiedDates = days.map(date => new Date(date).toLocaleDateString('uk', { timeZone: 'Europe/Helsinki' }));
  const months = days.map(date => new Date(date).getMonth());
  console.log("months", months);
  console.log("dates: ", modifiedDates);


  const state = {
    // x-axis labels:
    labels: [modifiedDates],
    // array of objects, can show several datasets
    datasets: [
      {
        //type: 'bar',
        // label for each dataset
        label: "Promoters",
        //borderColor: 
        //backgroundColor: single or array
        // one-dimensonal array
        data:
          [100, 200, 300, 200, 100],
        backgroundColor: ["#1D4E89"],
      },
      {
        //type: 'bar',
        // label for each dataset
        label: "Passives",
        //borderColor: 
        //backgroundColor: single or array
        // one-dimensonal array
        data:
          [120, 180, 200, 120, 120],
        backgroundColor: ["#0092ae"],
      }, {
        //type: 'bar',
        // label for each dataset
        label: "some other guys",
        //borderColor: 
        //backgroundColor: single or array
        // one-dimensonal array
        data:
          [10, 30, 500, 211, 111],

        backgroundColor: ["#7DCFB6"],
      },
      {
        type: 'line',
        // label for each dataset
        label: "response trend",
        //borderColor: 
        //backgroundColor: single or array
        // one-dimensonal array
        data:
          [100, 200, 300, 123, 123],
        backgroundColor: ["#ed6930"],
      },
    ]
  };

  return (
    <>

      <Bar
        data={state}
      // options={{
      //   x: {
      //     type: "date"
      //   }
      // }}
      />
    </>
  )
}
export default BarChart; 