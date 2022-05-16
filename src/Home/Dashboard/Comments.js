import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Comment from "./Comment";
import styles from "./Comments.module.css";
import { FaSort } from 'react-icons/fa';


const convertDate = (date) => {
  const event = new Date(date);
  let day = event.getDate().toString();
  let month = (event.getMonth() + 1).toString();
  let year = event.getFullYear().toString();
  //editing dates
  if (day.length == 1) day = '0' + day;
  if (month.length == 1) month = '0' + month;
  const result = day + '.' + month + '.' + year;
  return result;
}

const Comments = () => {

  const results = useSelector((state) => state.dashboard.results);
  const filtering = useSelector((state) => state.dashboard.comments);
  
  const resultsWithoutEmptyComments = results.filter(item => {
    if (item.comment !== '') return item;
  })
  const commentsPromoters = resultsWithoutEmptyComments.filter(item => {
    if (item.score >= 9) return item;
  })
  const commentsPassives = resultsWithoutEmptyComments.filter(item => {
    if (item.score > 6 && item.score < 9) return item;
  })
  const commentsDetractors = resultsWithoutEmptyComments.filter(item => {
    if (item.score <= 6) return item;
  })
  
  const [filteredResults, setFilteredResults] = useState(resultsWithoutEmptyComments);
  const [abc, setAbc] = useState(false);
  const [dateSort, setDateSort] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (filtering == 'all') setFilteredResults(resultsWithoutEmptyComments)
    if (filtering == 0) setFilteredResults(commentsPromoters)
    if (filtering == 1) setFilteredResults(commentsPassives)
    if (filtering == 2) setFilteredResults(commentsDetractors)
  }, [filtering])

  const commentsToDisplay = filteredResults.map(item => {
    return <Comment key={item.date} date={convertDate(item.date)} score={item.score} content={item.comment} />
  })

  const sortHandlerScore = () => {
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
  const sortHandlerDate = () => {
    let refilteredResults = [];
    if (dateSort) {
      refilteredResults = filteredResults.sort((a, b) => {
        let i = new Date(a.date);
        let j = new Date(b.date);
        return i - j;
      });
      setDateSort(false);
    } else {
      refilteredResults = filteredResults.sort((a, b) => {
        let i = new Date(a.date);
        let j = new Date(b.date);
        return j - i;
      });
      setDateSort(true);
    }
    setFilteredResults([...refilteredResults]);
  }

  const showAllComments = () => {
    dispatch({ type: "DASHBOARD", payload: { comments: 'all'}});
  }
  if (resultsWithoutEmptyComments.length == 0) {
    return (
      <div className={styles.Comments}>
        <div className={styles.tableHeader}>
        <div className={styles.date} onClick={sortHandlerDate}>Date <span><FaSort/></span></div>
        <div className={styles.score} onClick={sortHandlerScore}>Score <span><FaSort/></span></div>
        <div className={styles.content}>Comments</div></div>
        <div className='noData'>No data</div>
      </div>
    );
  } else {
    return (
      <div className={styles.Comments}>
        <div className={styles.tableHeader}>
        <div className={styles.date} onClick={sortHandlerDate}>Date <span><FaSort/></span></div>
        <div className={styles.score} onClick={sortHandlerScore}>Score <span><FaSort/></span></div>
        <div className={styles.content} onClick={showAllComments}>{(filtering == 'all' && 'Comments')}{(filtering !== 'all') && 'Back to all comments'}</div></div>
        <div className={styles.commentsContainer}>
          {commentsToDisplay}
        </div>
      </div>
    );
  }
};

export default Comments;
