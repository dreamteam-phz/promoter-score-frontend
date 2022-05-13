import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Comment from "./Comment";
import styles from "./Comments.module.css";
import { FaSort } from 'react-icons/fa';


const convertDate = (date) => {
  const event = new Date(date);
  const result = event.getDate().toString() + '.' + (event.getMonth() + 1).toString() + '.' + event.getFullYear().toString();
  return result;
}

const Comments = () => {
  const results = useSelector((state) => state.dashboard.results);
  const resultsWithoutEmptyComments = results.filter(item => {
    if (item.comment !== '') return item;
  })
  const [filteredResults, setFilteredResults] = useState(resultsWithoutEmptyComments);
  const [abc, setAbc] = useState(false);

  const commentsToDisplay = filteredResults.map(item => {
    return <Comment key={item.date} date={convertDate(item.date)} score={item.score} content={item.comment} />
  })

  const sortHandler = () => {
    let refilteredResults = [];
    if (abc) {
      refilteredResults = filteredResults.sort((a, b) => {
        return a.score - b.score;
      });
      setAbc(false);
    } else {
      refilteredResults = filteredResults.sort((a, b) => {
        return b.score - a.score;
      });
      setAbc(true);
    }
    setFilteredResults([...refilteredResults]);

  }
 
  return (
    <div className={styles.Comments}>
      <div className={styles.tableHeader}>
      <div className={styles.date}>DATE</div>
      <div className={styles.score} onClick={sortHandler}>SCORE <FaSort/></div>
      <div className={styles.content}>COMMENTS</div></div>
      <div className={styles.commentsContainer}>
        {commentsToDisplay}
      </div>
    </div>
  );
};

export default Comments;
