import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./Comments.module.css";

const Comments = () => {
  const data = useSelector((state) => state.dashboard.results);
  const whosComments = useSelector((state) => state.dashboard.comments);

  // let filteredData = data.filter((item) => item.comment.length > 0);

  const filterComments = (data, whosComments) => {
    return data.filter((item) => {
      switch (whosComments) {
        case "":
          return item.comment.length > 0;
        case "Promoters":
          return item.score >= 9 && item.comment.length > 0;
        case "Detractors":
          return item.score <= 6 && item.comment.length > 0;
        case "Passives":
          return item.score > 6 && item.score < 9 && item.comment.length > 0;
        default:
          break;
      }
    });
  };

  useEffect(() => {
    setFilteredData(filterComments(data, whosComments));
  }, [whosComments]);
  const [filteredData, setFilteredData] = useState(
    filterComments(data, whosComments)
  );
  useEffect(() => {
    setDataToDisplay(filteredData.reverse());
  }, [filteredData]);

  const [dataToDisplay, setDataToDisplay] = useState(filteredData.reverse());
  console.log(dataToDisplay);

  const sortingHandler = (event) => {
    let parameter = event.target.innerText.toLowerCase();
    let newOrder = filteredData.sort((a, b) => {
      return a[parameter] - b[parameter];
    });
    if (newOrder[0] === dataToDisplay[0]) {
      newOrder = filteredData.sort((a, b) => {
        return b[parameter] - a[parameter];
      });
    }
    console.log(newOrder);
    setDataToDisplay([...newOrder]);
  };
  const dates = dataToDisplay.map((item) => (
    <li key={item.date + item.comment}>{item.date.slice(0, 10)}</li>
  ));
  const scores = dataToDisplay.map((item) => (
    <li key={item.date + item.comment}>{item.score}</li>
  ));
  const comments = dataToDisplay.map((item) => (
    <li key={item.date + item.comment}>{item.comment}</li>
  ));
  return (
    <div className={styles.panel}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th onClick={sortingHandler}>
              Date <b>&#8691;</b>
            </th>
            <th>Score</th>
            <th>Comments</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={styles.date}>
              <ul className={styles.comments}>{dates}</ul>
            </td>
            <td className={styles.scores}>
              <ul className={styles.comments}>{scores}</ul>
            </td>
            <td>
              <ul className={styles.comments}>{comments}</ul>
            </td>
          </tr>
        </tbody>
      </table>
      <span></span>
    </div>
  );
};

export default Comments;
