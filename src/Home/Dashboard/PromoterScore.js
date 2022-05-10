import { useSelector } from "react-redux";
import styles from "./Dashboard.module.css";

const PromoterScore = () => {
  const data = useSelector(state => state.dashboard.data)
  const scoreData = useSelector(state => state.dashboard.scoreData)
  const period = useSelector(state => state.dashboard.selectedMonth)
  const scores = data.map((item) => item.score);

  // can be deleted
  const startingPoint = useSelector(state => state.dashboard.startingDate);
  const endingPoint = useSelector(state => state.dashboard.endingDate);


  // let prom = 0;
  // let det = 0;
  // let pass = 0;
  // for (let score of scores) {
  //   if (score >= 9) prom++;
  //   else if (score <= 6) det++;
  // }
  // pass = data.length - (prom + det);
  // const result = ((prom - det) / data.length) * 100;
  // const promScore = Math.floor(result);

  return (
    <div className={styles.panel}>
      <div className={styles.resultWraper}>
        <ul className="someList"></ul>
        <li key={startingPoint.toString()}>start {startingPoint.toString()}</li>
        <li key={endingPoint.toString()}>end {endingPoint.toString()}</li>

        {period === "1" && <h5>Promoter Score last month</h5>}
        {period !== "1" && <h5>Promoter Score last {period} days</h5>}
        <span>{scoreData.scores.length > 0 ? scoreData.promScore : <p>No data to display</p>}</span>
      </div>
    </div>
  );
};

export default PromoterScore;
