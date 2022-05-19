import React from "react";
import "chart.js/auto";
import { Bar, Line } from "react-chartjs-2";
import { useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import styles from './Dashboard.module.css';

const BarChart = () => {
  const data = useSelector(state => state.dashboard.data);
  const scoreData = useSelector(state => state.dashboard.scoreData);
  const startingDate = useSelector(state => state.dashboard.startingDate)
  const endingDate = useSelector(state => state.dashboard.endingDate)
  const preSelectedData = useSelector(state => state.dashboard.filteredData)


  // selecting data in correct daterange
  const dataToShow = preSelectedData.filter(item => {
    return new Date(item.date) >= startingDate && new Date(item.date) <= endingDate;
  })

  const options = { year: 'numeric', month: 'short', day: 'numeric' }

  //     return new Date(date).toLocaleDateString('en-GB', options)
  const days = dataToShow.map((item) => new Date(item).toLocaleDateString('en-GB', options));
  const modifiedDates = days.map(date => new Date(date).toLocaleDateString('uk', { timeZone: 'Europe/Helsinki' }));
  const promotersDataset = dataToShow.map((item) => item.promoter);

  const state = {
    // x-axis labels:
    labels: [{ days }],
    // array of objects, can show several datasets
    datasets: [
      {
        // label for each dataset
        label: "Promoters",
        //borderColor: 
        //backgroundColor: single or array
        // one-dimensonal array
        backgroundColor: ["#1D4E89"],
      },
      {
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
          [35, 30, 500, 211, 111],

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