import { useSelector } from "react-redux";
import styles from "./Dashboard.module.css";
import RespondersChart from "./RespondersChart";

const PromoterScoreChart = () => {
  const scoreData = useSelector(state => state.dashboard.scoreData);
  const period = useSelector(state => state.dashboard.selectedMonth)
  return (
    <div className={styles.panel}>

      {scoreData.scores.length > 0 ? (
        <div className={styles.respondersWraper}>
          <div className={styles.panelHeader}>
            <h2>PROMOTER SCORE</h2>
            {period === "1" && <h3>last month</h3>}
            {period !== "1" && <h3>last {period} days</h3>}

          </div>
          <div className={styles.resultWraper}>
            <h5>responses {scoreData.scores.length}</h5>
          </div>
          <RespondersChart />
        </div>
      ) : (
        <div className={styles.resultWraper}>
          <h4>Total responders</h4>
          <span>{scoreData.scores.length}</span>
        </div>
      )}
    </div>
  );
};

export default PromoterScoreChart;
