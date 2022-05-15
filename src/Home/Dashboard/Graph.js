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
  const results = useSelector((state) => state.dashboard.results);

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
  

  // console.log(promoters, detractors, passives);

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
  if (results.length == 0) {
    return (
      <div className={styles.graph}>
        <h2>Graph</h2>
      <div className={styles.Bar}></div>
      <div className='noData'>No data</div>
      </div>
  );
  } else {
    return (
        <div className={styles.graph}>
          <h2>Graph</h2>
        <div className={styles.Bar}><Bar options={options} data={data} /></div>
        </div>
    );
  }
};

export default Graph;
