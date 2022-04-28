import { useSelector } from "react-redux";
import styles from "./Dashboard.module.css";
import RespondersChart from "./RespondersChart";

const PromoterScoreChart = () => {
  const scoreData = useSelector(state => state.dashboard.scoreData);
  return (
    <div className={styles.panel}>
      {scoreData.scores.length > 0 ? (
        <div className={styles.respondersWraper}>
          <div className={styles.resultWraper}>
            <h5>Total responders</h5>
            <span>{scoreData.scores.length}</span>
          </div>
          <RespondersChart/>
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
