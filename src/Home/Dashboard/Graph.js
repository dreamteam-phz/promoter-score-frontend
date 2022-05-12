import styles from "./Graph.module.css";
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { StyleSharp } from "@material-ui/icons";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Amount of responds',
    },
  },
};


const whatMonth = (number) => {
  switch (number) {
    case 0: return 'January'
    case 1: return 'February'
    case 2: return 'March'
    case 3: return 'April'
    case 4: return 'May'
    case 5: return 'June'
    case 6: return 'July'
    case 7: return 'August'
    case 8: return 'September'
    case 9: return 'October'
    case 10: return 'November'
    case 11: return 'December'
    default: return 0;
  }
}
const getLabels = (results, type) => {
  const notUniqueLabels = [];
  for (let item of results) {
    if (!notUniqueLabels.includes(item.date)) notUniqueLabels.push(new Date(item.date));
  }
  const uniqueLabels = [];
  for (let item of notUniqueLabels) {
    if (!uniqueLabels.includes(item.getMonth())) uniqueLabels.push(item.getMonth());
  }
  const labelsInNumbres = uniqueLabels.map(item => item);
  const labelsInNames = labelsInNumbres.map(item => whatMonth(item));
  if (type == 'names') return labelsInNames;
  if (type == 'numbers') return labelsInNumbres;
}

const howManyPassives = (results, month) => {
  let count = 0;
  for (let item of results) {
    let date = new Date(item.date);
    if (date.getMonth() == month && item.score < 9 && item.score > 6) count++;
  }
  return count;
}
const howManyPromoters = (results, month) => {
  let count = 0;
  for (let item of results) {
    let date = new Date(item.date);
    if (date.getMonth() == month && item.score >= 9) count++;
  }
  return count;
}
const howManyDetractors = (results, month) => {
  let count = 0;
  for (let item of results) {
    let date = new Date(item.date);
    if (date.getMonth() == month && item.score <= 6) count++;
  }
  return count;
}

const Graph = () => {
  const dashboard = useSelector((state) => state.dashboard);
  const results = useSelector((state) => state.dashboard.results);
  const period = Math.round((dashboard.endDate - dashboard.startDate) / 86400000); // how many days
  console.log(results);
  // const results = [
  //   {score: 1, date: 'Mon January 03 2022 13:42:35 GMT+0300 (Eastern European Summer Time)'},
  //   {score: 2, date: 'Mon January 03 2022 13:42:35 GMT+0300 (Eastern European Summer Time)'},
  //   {score: 3, date: 'Mon January 03 2022 13:42:35 GMT+0300 (Eastern European Summer Time)'},
  //   {score: 7, date: 'Mon January 03 2022 13:42:35 GMT+0300 (Eastern European Summer Time)'},
  //   {score: 9, date: 'Mon January 03 2022 13:42:35 GMT+0300 (Eastern European Summer Time)'},
  //   {score: 10, date: 'Mon January 03 2022 13:42:35 GMT+0300 (Eastern European Summer Time)'},
  //   {score: 1, date: 'Sat February 05 2022 13:42:35 GMT+0300 (Eastern European Summer Time)'},
  //   {score: 3, date: 'Sat February 05 2022 13:42:35 GMT+0300 (Eastern European Summer Time)'},
  //   {score: 2, date: 'Sat February 05 2022 13:42:35 GMT+0300 (Eastern European Summer Time)'},
  //   {score: 2, date: 'Sat February 05 2022 13:42:35 GMT+0300 (Eastern European Summer Time)'},
  //   {score: 6, date: 'Sat February 05 2022 13:42:35 GMT+0300 (Eastern European Summer Time)'},
  //   {score: 7, date: 'Sat February 05 2022 13:42:35 GMT+0300 (Eastern European Summer Time)'},
  //   {score: 9, date: 'Sat February 05 2022 13:42:35 GMT+0300 (Eastern European Summer Time)'},
  //   {score: 10, date: 'Sat February 05 2022 13:42:35 GMT+0300 (Eastern European Summer Time)'},
  //   {score: 3, date: 'Sun March 06 2022 13:42:35 GMT+0300 (Eastern European Summer Time)'},
  //   {score: 9, date: 'Sun March 06 2022 13:42:35 GMT+0300 (Eastern European Summer Time)'},
  //   {score: 7, date: 'Sun March 06 2022 13:42:35 GMT+0300 (Eastern European Summer Time)'},
  //   {score: 2, date: 'Mon April 04 2022 13:42:35 GMT+0300 (Eastern European Summer Time)'},
  //   {score: 5, date: 'Mon April 04 2022 13:42:35 GMT+0300 (Eastern European Summer Time)'},
  //   {score: 6, date: 'Mon April 04 2022 13:42:35 GMT+0300 (Eastern European Summer Time)'},
  //   {score: 9, date: 'Mon April 04 2022 13:42:35 GMT+0300 (Eastern European Summer Time)'},
  //   {score: 9, date: 'Mon April 04 2022 13:42:35 GMT+0300 (Eastern European Summer Time)'},
  //   {score: 10, date: 'Mon April 04 2022 13:42:35 GMT+0300 (Eastern European Summer Time)'},
  //   {score: 5, date: 'Sat May 07 2022 13:42:35 GMT+0300 (Eastern European Summer Time)'},
  //   {score: 7, date: 'Sat May 07 2022 13:42:35 GMT+0300 (Eastern European Summer Time)'},
  //   {score: 6, date: 'Sat May 07 2022 13:42:35 GMT+0300 (Eastern European Summer Time)'},
  //   {score: 6, date: 'Sat May 07 2022 13:42:35 GMT+0300 (Eastern European Summer Time)'},
  //   {score: 6, date: 'Sat May 07 2022 13:42:35 GMT+0300 (Eastern European Summer Time)'},
  //   {score: 10, date: 'Sat May 07 2022 13:42:35 GMT+0300 (Eastern European Summer Time)'}
  // ]
  const labels = getLabels(results, 'names');
  const labelsInNumbres = getLabels(results, 'numbers');
  const promoters = [];
  const detractors = [];
  const passives = [];

  for (let label of labelsInNumbres) {
    promoters.push(howManyPromoters(results, label));
    detractors.push(howManyDetractors(results, label));
    passives.push(howManyPassives(results, label));
  }
  

  console.log(promoters, detractors, passives);

  const data = {
    labels,
    datasets: [
      {
        label: 'Promoters',
        data: promoters,
        backgroundColor: '#02c39a',
      },
      {
        label: 'Detractors',
        data: detractors,
        backgroundColor: '#ef476f',
      },
      {
        label: 'Passives',
        data: passives,
        backgroundColor: '#48cae4',
      },
    ],
  };
  return (
      <div className={styles.graph}>
        <h2>Graph</h2>
      <div className={styles.Bar}><Bar options={options} data={data} /></div>
      </div>
  );
};

export default Graph;
