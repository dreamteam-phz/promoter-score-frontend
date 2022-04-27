import styles from "./Dashboard.module.css";

const PromoterScore = ({ score, promScore, month }) => {
  return (
    <div className={styles.panel}>
      <div className={styles.resultWraper}>
        {month === "1" && <h5>Promoter Score last month</h5>}
        {month !== "1" && <h5>Promoter Score last {month} days</h5>}
        <span>{score.length > 0 ? promScore : <p>No data to display</p>}</span>
      </div>
    </div>
  );
};

export default PromoterScore;
