import { useDispatch, useSelector } from "react-redux";
import styles from "./DisplayFilter.module.css";
const DisplayFilter = () => {
  const period = useSelector(state => state.dashboard.selectedMonth)
  const dispatch = useDispatch();
  const options = [
    { label: "1 month", value: "30" },
    { label: "3 months", value: "90" },
    { label: "6 months", value: "180" },
    { label: "1 year", value: "365" },
  ];
  const filterChangeHandler = (event) => {
    dispatch({
      type: 'DASHBOARD',
      payload: {selectedMonth: event.target.value}
    });
  };
  
  return (
    <div className={styles.selectWrapper}>
      <select value={period} onChange={filterChangeHandler} className={styles.select}>
        {options.map(option => <option key={option.value} value={option.value}>{option.label}</option> )}
      </select>
    </div>
  );
};

export default DisplayFilter;
