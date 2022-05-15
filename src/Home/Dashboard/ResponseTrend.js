import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import styles from "./Trend.module.css";
import { useSelector } from 'react-redux';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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

export default function ResponseTrend() {
  const results = useSelector((state) => state.dashboard.results);

  const labelz = getLabels(results, 'numbers');
  const labels = [];
  for (let label of labelz) {
    labels.push('');
  }
  const responders = [];
  for (let label of labelz) {
    responders.push(howManyPromoters(results, label) + howManyDetractors(results, label) + howManyPassives(results, label))
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
        text: 'Chart.js Line Chart',
      },
    },
  };
    
  const data = {
    labels,
    datasets: [
      {
        label: 'Responds',
        data: responders,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        tension: 0.3
      }
    ],
  };

  if (results.length == 0) {
    return (
      <div className={styles.ResponseTrend}>
        <h2>Response trend</h2>
        <div className='noData'>No data</div>
      </div>
    );
  } else {
    return (
      <div className={styles.ResponseTrend}>
        <h2>Response trend</h2>
      <div className={styles.trendContainer}>
        <Line options={options} data={data} />
      </div>
      </div>
    );
  }

}
