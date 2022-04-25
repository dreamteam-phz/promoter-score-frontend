import styles from "./Dashboard.module.css";

const Comments = ({ data, comments }) => {
  return (
    <div className={styles.panel}>
      <div className={styles.resultWraper}>
        <div className={styles.titleHeader}>
          <h5>Comments</h5>
        </div>
        <span>
          {data.length > 0 ? (
            <ul className={styles.comments}>
              {comments.map((item) => (
                <li>
                  {item.date.slice(0, 10)}:{item.comment}
                </li>
              ))}
            </ul>
          ) : (
            <p>No data to display</p>
          )}
        </span>
      </div>
    </div>
  );
};

export default Comments;
