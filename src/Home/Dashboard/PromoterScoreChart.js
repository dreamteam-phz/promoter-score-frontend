import styles from "./Dashboard.module.css";
import RespondersChart from "./RespondersChart";

const PromoterScoreChart = ({ score, promoters, detractors, passives }) => {
  return (
    <div className={styles.panel}>
      {score.length > 0 ? (
        <div className={styles.respondersWraper}>
          <div className={styles.resultWraper}>
            <h5>Total responders</h5>
            <span>{score.length}</span>
          </div>
          <RespondersChart
            promoters={promoters}
            detractors={detractors}
            passives={passives}
          />
        </div>
      ) : (
        <div className={styles.resultWraper}>
          <h4>Total responders</h4>
          <span>{score.length}</span>
        </div>
      )}
    </div>
  );
};

export default PromoterScoreChart;
