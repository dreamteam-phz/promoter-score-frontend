import styles from "./Dashboard.module.css";

const PromMonthlyChart = ({ score, promScore }) => {
  return (
    <div className={styles.panel}>
      <div className={styles.resultWraper}>
        <div className={styles.titleHeader}>
          <h5>Promoter Score Monthly</h5>
        </div>
        <span>{score.length > 0 ? promScore : <p>No data to display</p>}</span>
      </div>
    </div>
  );
};

export default PromMonthlyChart;
