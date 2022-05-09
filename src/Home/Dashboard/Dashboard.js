import axios from "axios";
import React, { useEffect } from "react";
import styles from "./Dashboard.module.css";
import DisplayFilter from "./DisplayFilter";
import PromoterScore from "./PromoterScore";
import PromMonthlyChart from "./PromMonthlyChart";
import Comments from "./Comments";
import PromoterScoreChart from "./PromoterScoreChart";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/loader/Loader";

export default function Dashboard() {
  const loaded = useSelector((state) => state.loaded);
  const dashboard = useSelector((state) => state.dashboard); // for testing
  const surveyID = useSelector((state) => state.dashboard.surveyID);
  const dispatch = useDispatch();
  // console.log(dashboard); // for testing
  useEffect(() => {
    getResults();
  }, [surveyID]);
  

  // get data
  const getResults = () => {
    axios.get("http://localhost:4000/api/formscores").then((response) => {
      console.log(response.data)
      dispatch({ type: 'DASHBOARD', payload: { data: response.data} })
      setData(response.data, surveyID);
    });
  };
  const setData = (arrayOfObjects, surveyID = 0) => {
    let results; 
    if (surveyID == 0) {
      results = arrayOfObjects[0].results;
    } else {
      let index = arrayOfObjects.findIndex(item => item.surveyID === surveyID)
      results = arrayOfObjects[index].results;
    }
    dispatch({
          type: "DASHBOARD",
          payload: { results: results },
    });
    let prom = 0;
    let det = 0;
    let pass = 0;
    const scores = results.map((item) => item.score);
    for (let score of scores) {
      if (score >= 9) prom++;
      else if (score <= 6) det++;
    }
    pass = results.length - (prom + det);
    const result = ((prom - det) / results.length) * 100;
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
    setTimeout(() => {
      dispatch({ type: "LOADED", payload: true });
    }, 700);
    // dispatch({ type: "LOADED", payload: true });
  }
  
  return (
    
    <div className={styles.dashboard}>
      {/* <DisplayFilter update={setData} /> */}
      {loaded &&
        <div className={styles.data}>
          <PromoterScore />
          <PromMonthlyChart />
          <PromoterScoreChart />
          <Comments />
        </div>}
        {!loaded && <Loader/>}
    </div>
  );

}
