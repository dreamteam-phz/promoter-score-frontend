import { Slide } from "@material-ui/core";
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

            <RespondersChart />
          </div>
          <div className={styles.respondersChartLegend}>
            {/* <ul className={styles.squareBullets}>
              <li className={styles.promotersLi}>Promoters  {scoreData.promoters} ({Math.round(scoreData.promoters * 100 / scoreData.scores.length)}%)</li>
              <li className={styles.passivesLi}>Passives {scoreData.passives} ({Math.round(scoreData.passives * 100 / scoreData.scores.length)}%)</li>
              <li className={styles.detractors}>Detractors {scoreData.detractors} ({Math.round(scoreData.detractors * 100 / scoreData.scores.length)}%)</li>
            </ul> */}

          </div>
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
