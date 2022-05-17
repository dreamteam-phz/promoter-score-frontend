import React from 'react'
import styles from "./Bar.module.css";
import Label from './Label';
import { Link } from 'react-router-dom';
import { BiAddToQueue } from 'react-icons/bi';
import { IoMdStats } from 'react-icons/io';
import { FiHelpCircle } from 'react-icons/fi';
import { IoMdExit } from 'react-icons/io';
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import DatePicker from 'react-datepicker';
import axios from "axios";
import 'react-datepicker/dist/react-datepicker.css';



export default function Bar() {
  const dashboard = useSelector((state) => state.dashboard); // for testing
  const location = useSelector((state) => state.location); // for testing
  const period = useSelector((state) => state.dashboard.selectedMonth);
  const dispatch = useDispatch();

  const URL_SURVEY_API = "http://localhost:4000/api/surveys";
  const [selectSurvey, setSelectSurvey] = useState([]);
  const [selectQuestion, setSelectQuestion] = useState('hi');
  const [data, setData] = useState([]);
  // for monthly time selector 
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

        // const data = response.data.sort((a, b) => a.name.localeCompare(b.name))
        const data = response.data.sort((a, b) => a._id.localeCompare(b._id))
        setData(data);
        setSelectQuestion(data[0].question);
        setSelectSurvey(data);
      })
      .catch((error) => console.log(error.message));

  }, []);

  const filterChangeHandler = (event) => {
    dispatch({
      type: "DASHBOARD",
      payload: { [event.target.name]: event.target.value },
    });
  };
  const filterChangeHandlerSurvey = (event) => {
    const question = data.filter(item => {
      if (item._id == event.target.value) return item
    })[0].question;
    setSelectQuestion(question);
    dispatch({ type: "LOADED", payload: false });
    dispatch({
      type: "DASHBOARD",
      payload: { surveyID: event.target.value }
    });
  };

  const labelHandler = (event) => {
    dispatch({
      type: 'LOCATION',
      payload: event.target.value
    });
  }
  const startDateHandler = (date) => {
    dispatch({
      type: "DASHBOARD",
      payload: { startDate: date }
    })
  }
  const endDateHandler = (date) => {
    dispatch({
      type: "DASHBOARD",
      payload: { endDate: date }
    })
  }

  return (
    <div className={styles.bar}>
      <div className={styles.nav}>
        {/* </div>
            
          <div className={styles.nav}>   */}

        <Label id='create' name='location' content={<BiAddToQueue />} change={labelHandler} />
        <Label id='dashboard' name='location' value={true} content={<IoMdStats />} change={labelHandler} />
        <Label id='instructions' name='location' content={<FiHelpCircle />} change={labelHandler} />
        {(location === 'dashboard') &&
          <select name="selectedSurvey" onChange={filterChangeHandlerSurvey} className={styles.select}>
            {selectSurvey.map((survey) => <option key={survey._id} value={survey._id} question={survey.question}>{survey.name}</option>)}
          </select>}
          <div className={styles.datePicker}>
        {(location === 'dashboard') &&
        
          <DatePicker
            id="startDate"
            selected={dashboard.startDate}
            dateFormat="dd/MM/yyyy"
            maxDate={new Date()}
            onSelect={startDateHandler}
            showYearDropdown
            scrollableMonthYearDropdown />}
        {(location === 'dashboard') &&
          <DatePicker
            id="endDate"
            selected={dashboard.endDate}
            dateFormat="dd/MM/yyyy"
            minDate={dashboard.startDate}
            maxDate={new Date()}
            onSelect={endDateHandler}
            showYearDropdown
            showMonthDropdown
            scrollableMonthYearDropdown
            showWeekNumbers
          />
        }</div>


      </div>
      <div className={styles.nav}>
        {location === 'dashboard' && <div className={styles.question}>{selectQuestion}</div>}
        <button><Link to='/'><IoMdExit /></Link></button>
      </div>
    </div >
  )
}
