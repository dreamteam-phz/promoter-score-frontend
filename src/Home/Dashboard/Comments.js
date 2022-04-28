import styles from "./Comments.module.css";

const Comments = ({ data }) => {
  // const dummyData = [
  //   {
  //     score: 10,
  //     comment: "Answer 1 ",
  //     date: "2022-04-26T13:00:46.995+00:00",
  //   },
  //   {
  //     score: 10,
  //     comment: "Answer 1 ",
  //     date: "2022-04-26T13:00:46.995+00:00",
  //   },
  //   {
  //     score: 10,
  //     comment: "Answer 1 ",
  //     date: "2022-04-26T13:00:46.995+00:00",
  //   },
  //   {
  //     score: 10,
  //     comment: "Answer 1 ",
  //     date: "2022-04-26T13:00:46.995+00:00",
  //   },
  //   {
  //     score: 10,
  //     comment: "Answer 1 ",
  //     date: "2022-04-26T13:00:46.995+00:00",
  //   },
  //   {
  //     score: 10,
  //     comment: "Answer 1 ",
  //     date: "2022-04-26T13:00:46.995+00:00",
  //   },
  //   {
  //     score: 10,
  //     comment: "Answer 1 ",
  //     date: "2022-04-26T13:00:46.995+00:00",
  //   },
  //   {
  //     score: 10,
  //     comment: "Answer 1 ",
  //     date: "2022-04-26T13:00:46.995+00:00",
  //   },
  //   {
  //     score: 10,
  //     comment: "Answer 1 ",
  //     date: "2022-04-26T13:00:46.995+00:00",
  //   },
  //   {
  //     score: 10,
  //     comment: "Answer 1 ",
  //     date: "2022-04-26T13:00:46.995+00:00",
  //   },
  //   {
  //     score: 10,
  //     comment: "Answer 1 ",
  //     date: "2022-04-26T13:00:46.995+00:00",
  //   },
  //   {
  //     score: 10,
  //     comment: "Answer 1 ",
  //     date: "2022-04-26T13:00:46.995+00:00",
  //   },
  //   {
  //     score: 10,
  //     comment: "Answer 1 ",
  //     date: "2022-04-26T13:00:46.995+00:00",
  //   },
  //   {
  //     score: 10,
  //     comment: "Answer 1 ",
  //     date: "2022-04-26T13:00:46.995+00:00",
  //   },
  //   {
  //     score: 10,
  //     comment: "Answer 1 ",
  //     date: "2022-04-26T13:00:46.995+00:00",
  //   },
  //   {
  //     score: 10,
  //     comment: "Answer 1 ",
  //     date: "2022-04-26T13:00:46.995+00:00",
  //   },
  //   {
  //     score: 10,
  //     comment: "Answer 1 ",
  //     date: "2022-04-26T13:00:46.995+00:00",
  //   },
  //   {
  //     score: 10,
  //     comment: "Answer 1 ",
  //     date: "2022-04-26T13:00:46.995+00:00",
  //   },
  // ];
  const filteredData = data.filter((item) => item.comment.length > 0);
  const dataToDispaly = filteredData.reverse();
  // console.log(dataToDispaly);
  return (
    <div className={styles.panel}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Score</th>
            <th>Comments</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={styles.date}>
              <ul className={styles.comments}>
                {dataToDispaly.map((item) => (
                  <li key={item.date}>{item.date.slice(0, 10)}</li>
                ))}
              </ul>
            </td>
            <td className={styles.scores}>
              <ul className={styles.comments}>
                {dataToDispaly.map((item) => (
                  <li key={item.date}>{item.score}</li>
                ))}
              </ul>
            </td>
            <td>
              <ul className={styles.comments}>
                {dataToDispaly.map((item) => (
                  <li key={item.date}>{item.comment}</li>
                ))}
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
      <span></span>
    </div>
  );
};

export default Comments;