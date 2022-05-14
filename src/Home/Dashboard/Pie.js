import styles from "./Pie.module.css";
import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useSelector } from "react-redux";

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        align: 'start'
      }
    },
    title: {
      display: true,
      text: 'Amount of responds'
    },
  },
};

const howManyPassives = (results, month) => {
  let count = 0;
  if (month === 'overall') {
    for (let item of results) {
      if (item.score < 9 && item.score > 6) count++;
    }
  } else {
    for (let item of results) {
      let date = new Date(item.date);
      if (date.getMonth() == month && item.score < 9 && item.score > 6) count++;
    }
  }
  return count;
}
const howManyPromoters = (results, month) => {
  let count = 0;
  if (month === 'overall') {
    for (let item of results) {
      if (item.score >= 9) count++;
    }
  } else {
    for (let item of results) {
      let date = new Date(item.date);
      if (date.getMonth() == month && item.score >= 9) count++;
    }
  }
  return count;
}
const howManyDetractors = (results, month) => {
  let count = 0;
  if (month === 'overall') {
    for (let item of results) {
      if (item.score <= 6) count++;
    }
  } else {
    for (let item of results) {
      let date = new Date(item.date);
      if (date.getMonth() == month && item.score <= 6) count++;
    }
  }
  return count;
}

const Pie = () => {
  const results = useSelector((state) => state.dashboard.results);

  const promoters = howManyPromoters(results, 'overall');
  const detractors = howManyDetractors(results, 'overall');
  const passives = howManyPassives(results, 'overall');
  const overall = promoters + detractors + passives;
  const percentPro = Math.round(promoters / overall * 100)
  const percentPas = Math.round(passives / overall * 100)
  const percentDet = Math.round(detractors / overall * 100)
  const nps = Math.round((promoters - detractors) / overall * 100);

  const data = {
    labels: [`Promoters  ${percentPro}%(${promoters})`, `Passives ${percentPas}%(${passives})`, `Detractors  ${percentDet}%(${detractors})`],
    datasets: [
      {
        label: 'Hello',
        data: [promoters, passives, detractors],
        backgroundColor: [
          '#02c39a',
          '#48cae4',
          '#ef476f'
        ],
        borderColor: [
          '#02c39a',
          '#48cae4',
          '#ef476f'
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={styles.Pie}>
      <h2>Pie</h2>
      <div className={styles.pieContainer}>
        <Doughnut data={data} options={options} />  
      </div>
      <p className={styles.title}>{nps}</p>
    </div>
  );
};

export default Pie;
