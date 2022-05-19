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
import { useSelector } from "react-redux";
import { BloodtypeOutlined } from "@mui/icons-material";

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
      onHover: (event, chartElement) => {
        event.native.target.style.cursor = 'pointer';
      },
      onLeave: (event, chartElement) => {
        event.native.target.style.cursor = 'default';
      },
      position: 'right',
      align: 'start',
      labels: {
        boxWidth: 16,
        font: {
          family: "'Lato', sans-serif",
        },
      },
      title: {
        display: true,
        //text: 'Amount of responds',
      },
    },
  },
  scales: {
    x: {
      ticks: {
        font: {
          family: "'Lato', sans-serif"
        },
      },
    },
    y: {
      ticks: {
        stepSize: 1,
        font: {
          family: "'Lato', sans-serif"
        }
      },
      grid: {
        lineWidth: 0.5,
      },
      title: {
        display: true,
        font: {
          family: "'Lato', sans-serif"
        },
        text: "responses",
        align: "end",
      },
    },
  }
};


const whatMonth = (number) => {
  switch (number) {
    case 0: return 'Jan'
    case 1: return 'Feb'
    case 2: return 'Mar'
    case 3: return 'Apr'
    case 4: return 'May'
    case 5: return 'Jun'
    case 6: return 'Jul'
    case 7: return 'Aug'
    case 8: return 'Sep'
    case 9: return 'Oct'
    case 10: return 'Nov'
    case 11: return 'Dec'
    default: return 0;
  }
}

const getLabelsDetailed = (results) => {
  const notUniqueLabels = [];
  for (let item of results) {
    if (!notUniqueLabels.includes(item.date)) notUniqueLabels.push(new Date(item.date));
  }
  const uniqueLabels = []; //objects {month: xx, year: yy}
  for (let item of notUniqueLabels) {
    if (uniqueLabels.filter(elem =>
      (elem.month == item.getMonth() && elem.year == item.getFullYear())).length == 0) {
      uniqueLabels.push({ month: item.getMonth(), year: item.getFullYear() });
    };
  }
  return uniqueLabels;
}
const howManyPromotersDetailed = (results, year, month) => {
  let count = 0;
  for (let item of results) {
    let date = new Date(item.date);
    if (date.getFullYear() == year && date.getMonth() == month && item.score >= 9) count++;
  }
  return count;
}
const howManyPassivesDetailed = (results, year, month) => {
  let count = 0;
  for (let item of results) {
    let date = new Date(item.date);
    if (date.getFullYear() == year && date.getMonth() == month && item.score < 9 && item.score > 6) count++;
  }
  return count;
}
const howManyDetractorsDetailed = (results, year, month) => {
  let count = 0;
  for (let item of results) {
    let date = new Date(item.date);
    if (date.getFullYear() == year && date.getMonth() == month && item.score <= 6) count++;
  }
  return count;
}
const promScoreDetailed = (results) => {
  let promoters = 0;
  let detractors = 0;
  for (let item of results) {
    if (item.score >= 9) {
      promoters++;
    }
    else if (item.score <= 6) {
      detractors++;
    }
  }
  return ((promoters - detractors) / results.length) * 100;
};



const Graph = () => {
  const results = useSelector((state) => state.dashboard.results);
  const labelsDetailed = getLabelsDetailed(results);
  const promotersMonthly = [];
  const detractorsMonthly = [];
  const passivesMonthly = [];
  const labels = [];

  for (let elem of labelsDetailed) {
    console.log(elem);
    labels.push(whatMonth(elem.month) + ' / ' + elem.year.toString().slice(-2));
  }

  for (let label of labelsDetailed) {
    promotersMonthly.push(howManyPromotersDetailed(results, label.year, label.month));
    passivesMonthly.push(howManyPassivesDetailed(results, label.year, label.month));
    detractorsMonthly.push(howManyDetractorsDetailed(results, label.year, label.month));
  }
  const data = {
    labels,
    datasets: [
      {
        label: 'Promoters',
        data: promotersMonthly,
        backgroundColor: '#1d4e89',
        hoverOffset: 200,
      },
      {
        label: 'Detractors',
        data: detractorsMonthly,
        backgroundColor: '#7dcfb6',
        hoverOffset: 200,
      },
      {
        label: 'Passives',
        data: passivesMonthly,
        backgroundColor: '#0092ae',
        hoverOffset: 200,
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
        <h2>GRAPH</h2>
        <div className={styles.Bar}><Bar options={options} data={data} /></div>
      </div>
    );
  }
};

export default Graph;
