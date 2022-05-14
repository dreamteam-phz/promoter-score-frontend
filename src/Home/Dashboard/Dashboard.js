import axios from "axios";
import React, { useEffect } from "react";
import styles from "./Dashboard.module.css";
import DisplayFilter from "./DisplayFilter";
import PromoterScore from "./PromoterScore";
import Graph from "./Graph";
import Comments from "./Comments";
import Pie from "./Pie";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/loader/Loader";
import { dateHelper } from "../../helpers/DateHelper";
import Trend from "./Trend";

export default function Dashboard() {
  const loaded = useSelector((state) => state.loaded);
  const dashboard = useSelector((state) => state.dashboard); // for testing
  const surveyID = useSelector((state) => state.dashboard.surveyID);
  const dispatch = useDispatch();
  const period = Math.round((dashboard.endDate - dashboard.startDate) / 86400000); // how many days
  useEffect(() => {
    getResults();
  }, [surveyID, period]);
  
  // console.log(dashboard.results)
  // get data
  const getResults = () => {
    axios.get("http://localhost:4000/api/formscores").then((response) => {
      // console.log(response.data)
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
    // console.log(results)
    let prom = 0;
    let det = 0;
    let pass = 0;
    const filteredResults = results.filter((result) => dateHelper(result.date, period));
    // console.log(filteredResults)
    dispatch({
          type: "DASHBOARD",
          payload: { results: filteredResults },
    });
    const scores = filteredResults.map((item) => item.score);
    for (let score of scores) {
      if (score >= 9) prom++;
      else if (score <= 6) det++;
    }
    pass = filteredResults.length - (prom + det);
    const result = ((prom - det) / filteredResults.length) * 100;
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
          <div className={styles.box}>
            <Pie />
            <Trend />
            <Trend />
          </div>
          <div className={styles.box}>
            <Graph />
            <Comments />
          </div>

          
          
          
        </div>}
        {!loaded && <Loader/>}
    </div>
  );

}
