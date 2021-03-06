import { useDispatch, useSelector } from "react-redux";

import { useState, useEffect } from "react";
import styles from "./DisplayFilter.module.css";
import axios from "axios";

// import Date from "../../components/datePicker/Date";

const DisplayFilter = (props) => {
  const dashboard = useSelector((state) => state.dashboard); // for testing
  const period = useSelector((state) => state.dashboard.selectedMonth);
  const dispatch = useDispatch();

  const URL_SURVEY_API = "http://localhost:4000/api/surveys";
  const [selectSurvey, setSelectSurvey] = useState([]);

  const options = [
    { label: "1 month", value: "30" },
    { label: "3 months", value: "90" },
    { label: "6 months", value: "180" },
    { label: "1 year", value: "365" }
  ];

  useEffect(() => {
    axios
      .get(URL_SURVEY_API)
      .then((response) => {
        const data = response.data;
        setSelectSurvey(data);
      })
      .catch((error) => console.log(error.message));
  }, []);
  // console.log(selectSurvey);
  // console.log(selectSurvey.map((item) => item.name)); // to extract the survey name
  const filterChangeHandler = (event) => {
    dispatch({
      type: "DASHBOARD",
      payload: { [event.target.name]: event.target.value },
    });
  };
  const filterChangeHandlerSurvey = (event) => {
    dispatch({ type: "LOADED", payload: false });
    dispatch({
      type: "DASHBOARD",
      payload: { selectedSurvey: event.target.value },
    });
    props.update(dashboard.data, event.target.value)
    console.log(dashboard);

  };


  return (
    <div className={styles.selectWrapper}>
      <select
        name="selectedSurvey"
        onChange={filterChangeHandlerSurvey}
        className={styles.select}
      >
        {selectSurvey.map((survey) => (
          <option key={survey._id} value={survey._id}>
            {survey.question}
          </option>
        ))}
      </select>
      <select name="selectedMonth" value={period} onChange={filterChangeHandler} className={styles.select}>
        {options.map(option =>
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        )}
      </select>
    </div>
  );
};

export default DisplayFilter;
