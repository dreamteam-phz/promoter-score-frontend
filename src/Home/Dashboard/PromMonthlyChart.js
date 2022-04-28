import { useSelector } from "react-redux";
import styles from "./Dashboard.module.css";

const PromMonthlyChart = () => {
  const scoreData = useSelector(state => state.dashboard.scoreData)
  
  return (
    <div className={styles.panel}>
      <div className={styles.resultWraper}>
        <div className={styles.titleHeader}>
          <h5>Promoter Score Monthly</h5>
        </div>
        <span>{scoreData.scores.length > 0 ? scoreData.promScore : <p>No data to display</p>}</span>
      </div>
    </div>
  );
};

export default PromMonthlyChart;
