import { useSelector } from "react-redux";
import BarChart from "./BarChart";
import styles from "./Dashboard.module.css";


const PromMonthlyChart = () => {
  const scoreData = useSelector(state => state.dashboard.scoreData)
  const period = useSelector(state => state.dashboard.selectedMonth)

  return (
    <div className={styles.panel}>
      <div className={styles.resultWraper}>
        <div className={styles.panelHeader}>
          <h2>PROMOTER SCORE MONTHLY</h2>
          {period === "1" && <h3>last month</h3>}
          {period !== "1" && <h3>last {period} days</h3>}
        </div>
        <BarChart></BarChart>
        <span>{scoreData.scores.length === 0 ? <p>No data to display</p> : ""}</span>
      </div>
    </div>
  );
};

export default PromMonthlyChart;
