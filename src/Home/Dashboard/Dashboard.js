import axios from "axios";
import React, { useEffect } from "react";
import styles from "./Dashboard.module.css";
import DisplayFilter from "./DisplayFilter";
import PromoterScore from "./PromoterScore";
import PromMonthlyChart from "./PromMonthlyChart";
import Comments from "./Comments";
import PromoterScoreChart from "./PromoterScoreChart";
import { useDispatch, useSelector } from "react-redux";

export default function Dashboard() {
  const loaded = useSelector((state) => state.loaded);
  // const dashboard = useSelector((state) => state.dashboard); // for testing
  const dispatch = useDispatch();
  // console.log(dashboard); // for testing
  useEffect(() => {
    getResults();
  }, []);

  const getResults = () => {
    axios.get("http://localhost:4000/api/formscores").then((response) => {
      let data = response.data[0].results;
      console.log(response.data);
      dispatch({
        type: "DASHBOARD",
        payload: { data: data },
      });
      dispatch({
        type: "DASHBOARD",
        payload: { response: response },
      });
      let prom = 0;
      let det = 0;
      let pass = 0;
      const scores = data.map((item) => item.score);
      for (let score of scores) {
        if (score >= 9) prom++;
        else if (score <= 6) det++;
      }
      pass = data.length - (prom + det);
      const result = ((prom - det) / data.length) * 100;
      const promScore = Math.floor(result);
      dispatch({
        type: "DASHBOARD",
        payload: {
          scoreData: {
            promoters: prom,
            detractors: det,
            passives: pass,
            result: result,
            promScore: promScore,
            scores: scores,
          },
        },
      });

      dispatch({ type: "LOADED", payload: true });
    });
  };
  const calculations = (data) => {
    let prom = 0;
    let det = 0;
    let pass = 0;
    // console.log(data[0].results)
    const scores = data[0].results.map((item) => item.score);
    for (let score of scores) {
      if (score >= 9) prom++;
      else if (score <= 6) det++;
    }
    pass = data[0].results.length - (prom + det);
    const result = ((prom - det) / data[0].results.length) * 100;
    const promScore = Math.floor(result);
    dispatch({
      type: "DASHBOARD",
      payload: {
        scoreData: {
          promoters: prom,
          detractors: det,
          passives: pass,
          result: result,
          promScore: promScore,
          scores: scores,
        },
      },
    });

    dispatch({ type: "LOADED", payload: true });
  };

  // const dummyData = [
  //   {
  //     date: "2022-01-19T00:00:00.502Z",
  //   },
  //   {
  //     date: "2022-02-19T00:00:00.502Z",
  //   },
  //   {
  //     date: "2022-03-19T00:00:00.502Z",
  //   },
  //   {
  //     date: "2022-04-19T00:00:00.502Z",
  //   },
  //   {
  //     date: "2021-09-19T00:00:00.502Z",
  //   },
  // ];

  if (loaded) {
    return (
      <div className={styles.dashboard}>
        <h1>DASHBOARD</h1>
        <DisplayFilter update={calculations} />
        <div className={styles.data}>
          <PromoterScore />
          <PromMonthlyChart />
          <PromoterScoreChart />
          <Comments />
        </div>
      </div>
    );
  } else {
    return <p>nothing to show</p>;
  }
}
