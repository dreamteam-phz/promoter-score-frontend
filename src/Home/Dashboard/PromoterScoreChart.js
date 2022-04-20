import styles from "./Dashboard.module.css";
import RespondersChart from "./RespondersChart";

const PromoterScoreChart = ({ data, promoters, detractors, passives }) => {
  return (
    <div className={styles.panel}>
      {data.length > 0 ? (
        <div className={styles.respondersWraper}>
          <div className={styles.resultWraper}>
            <h5>Total responders</h5>
            <span>{data.length}</span>
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
          <span>{data.length}</span>
        </div>
      )}
    </div>
  );
};

export default PromoterScoreChart;
