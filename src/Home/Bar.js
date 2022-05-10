import React from 'react'
import styles from "./Bar.module.css";
import Label from './Label';
import { Link } from 'react-router-dom';
import { BiAddToQueue } from 'react-icons/bi';
import { IoMdStats } from 'react-icons/io';
import { MdOutlineStorage } from 'react-icons/md';
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

  // can be deleted
  const startingPoint = useSelector(state => state.dashboard.startingDate);
  const endingPoint = useSelector(state => state.dashboard.endingDate);

  // setting date to first of 6 months ago
  let startingDate = new Date();
  startingDate.setMonth(startingDate.getMonth() - 6);
  startingDate.setDate(1);


  const URL_SURVEY_API = "http://localhost:4000/api/surveys";
  const [selectSurvey, setSelectSurvey] = useState([]);
  const [startDate, setStartDate] = useState(startingDate);
  const [endDate, setEndDate] = useState(new Date());

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
        const data = response.data;
        setSelectSurvey(data);
      })
      .catch((error) => console.log(error.message));
    dispatch({
      type: 'DASHBOARD',
      payload: {
        startingDate: startDate, endingDate: endDate
      }
    })

  }, []);
  // console.log(selectSurvey);
  // console.log(selectSurvey.map((item) => item.name)); // to extract the survey name

  // compare datestamps as .toDateString
  // useEffect(() => {
  //   dispatch({
  //     type: 'DASHBOARD',
  //     payload: { startingDate: startDate.toDateString, endingDate: endDate.toDateString }
  //   })
  // }), [startDate, endDate];
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
      payload: { surveyID: event.target.value }
    });
    //   props.update(dashboard.data, event.target.value)
    console.log("dashboard", dashboard);
  };

  const labelHandler = (event) => {
    dispatch({
      type: 'LOCATION',
      payload: event.target.value
    });
  }
  const startDateHandler = (event) => {
    setStartDate(event);
    dispatch({
      type: 'DASHBOARD',
      payload: {
        startingDate: event
      }
    })
  }
  const endDateHandler = (event) => {
    setEndDate(event);
    dispatch({
      type: 'DASHBOARD',
      payload: {
        endingDate: event
      }
    })
  }

  return (
    <div className={styles.bar}>
      <div className={styles.nav}>
        {/* </div>
            
          <div className={styles.nav}>   */}

        <Label id='create' name='location' content={<BiAddToQueue />} change={labelHandler} />
        <Label id='dashboard' name='location' checked={true} content={<IoMdStats />} change={labelHandler} />
        <Label id='settings' name='location' content={<MdOutlineStorage />} change={labelHandler} />
        <Label id='instructions' name='location' content={<FiHelpCircle />} change={labelHandler} />
        {(location === 'dashboard') &&
          <select name="selectedSurvey" onChange={filterChangeHandlerSurvey} className={styles.select}>
            {selectSurvey.map((survey) => <option key={survey._id} value={survey._id}>{survey.name} ({survey.question}) </option>)}
          </select>}
        {(location === 'dashboard') &&
          <DatePicker key={startDate.toString()} id="date" selected={startDate} dateFormat="dd/MM/yyyy"
            onChange={startDateHandler} />}
        {(location === 'dashboard') &&
          <DatePicker key={endDate.toString()} id="date" selected={endDate} dateFormat="dd/MM/yyyy" maxDate={new Date()} onChange={endDateHandler} />
        }

      </div>
      <div className={styles.nav}>
        {(location === 'dashboard') &&
          <select name="selectedMonth" value={period} onChange={filterChangeHandler} className={styles.select}>
            {options.map(option => <option key={option.value} value={option.value}>
              {option.label}
            </option>
            )}
          </select>}


        <button><Link to='/'><IoMdExit /></Link></button>
      </div>
    </div >
  )
}
