import styles from "./Pie.module.css";
import React, { useCallback, useEffect, useState, useRef } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Chart, Doughnut } from 'react-chartjs-2';
import { useDispatch, useSelector } from "react-redux";
import { getElementAtEvent } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  // aspectRatio: 1,
  maintainAspectRatio: false,
  responsive: true,
  cutout: '70%',
  layout: {
    padding: {
      top: 0,
      bottom: 60,
      left: 60,
      right: 60,
    },
  },

  onHover: (event, chartElement) => {
    if (chartElement.length === 1) {
      event.native.target.style.cursor = 'pointer'
    };
    if (chartElement.length === 0) {
      event.native.target.style.cursor = 'default'
    };
  },
  plugins: {
    legend: {
      display: false,
      // position: 'bottom',
      // labels: {
      //   align: 'start'
      // },
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
  const npsNow = useSelector((state) => state.dashboard.nps)
  const dispatch = useDispatch();
  const chartRef = useRef();
  //variables
  const promoters = howManyPromoters(results, 'overall');
  const detractors = howManyDetractors(results, 'overall');
  const passives = howManyPassives(results, 'overall');
  const overall = promoters + detractors + passives;
  const percentPro = Math.round(promoters / overall * 100);
  const percentPas = Math.round(passives / overall * 100);
  const percentDet = Math.round(detractors / overall * 100);
  const nps = Math.round((promoters - detractors) / overall * 100);

  const data = {
    labels: [`Promoters  ${percentPro}% (${promoters})`, `Passives ${percentPas}% (${passives})`, `Detractors  ${percentDet}% (${detractors})`],
    datasets: [
      {
        data: [promoters, passives, detractors],
        backgroundColor: [
          '#1d4e89',
          '#0092ae',
          '#7dcfb6'
        ],
        borderColor: [
          '#1d4e89',
          '#00b2ca',
          '#7dcfb6'
        ],
        borderWidth: 1,
        hoverOffset: 4,
      },
    ],
  };

  const clickHandler = (event) => {
    let index = getElementAtEvent(chartRef.current, event)[0].index;
    if (index == 0) {
      dispatch({ type: "DASHBOARD", payload: { comments: 0 } });
    } else if (index == 1) {
      dispatch({ type: "DASHBOARD", payload: { comments: 1 } });
    } else if (index == 2) {
      dispatch({ type: "DASHBOARD", payload: { comments: 2 } });
    } else {
      console.log('Hello, PHZ!')
    }
  }

  if (results.length == 0) {
    return (
      <div className={styles.Pie}>
        <h2>SCORE</h2>
        <div className={styles.pieContainer}>

        </div>
        <div className='noData'>No data</div>
      </div>
    );
  } else {
    return (
      <div className={styles.Pie}>
        <h2>SCORE</h2>
        <div className={styles.pieContainer}>        <p>responses {results.length}</p>

          <Doughnut className={styles.doughnut} ref={chartRef} data={data} options={options} onClick={clickHandler}/>
        </div>
        <p className={styles.title}>{nps}</p>
        <div className={styles.customLegend}>
          <ul>
            <li className={styles.textName}>
              <span className={styles.text}>Promoters: {promoters}  ({percentPro}%)</span>
            </li>
            <li className={styles.textName}>
              <span className={styles.text}>Detractors: {detractors}  ({percentDet}%)</span>
            </li>
            <li className={styles.textName}>

              <span className={styles.text}>Passives: {passives}  ({percentPas}%)</span>
            </li>

          </ul>
        </div>
      </div>
    );
  }
};

export default Pie;
