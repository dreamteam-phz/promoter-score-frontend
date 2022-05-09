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
import 'react-datepicker/dist/react-datepicker-cssmodules.css';



export default function Bar() {
  const dashboard = useSelector((state) => state.dashboard); // for testing
  const location = useSelector((state) => state.location); // for testing
  const period = useSelector((state) => state.dashboard.selectedMonth);
  const dispatch = useDispatch();

  // setting date to first of 6 months ago
  let startingDate = new Date();
  startingDate.setMonth(startingDate.getMonth() - 6);
  startingDate.setDate(1);


  const URL_SURVEY_API = "http://localhost:4000/api/surveys";
  const [selectSurvey, setSelectSurvey] = useState([]);
  const [startDate, setStartDate] = useState(startingDate);
  const [endDate, setEndDate] = useState(new Date());

  // for monthly time selector 
  // const options = [
  //   { label: "1 month", value: "30" },
  //   { label: "3 months", value: "90" },
  //   { label: "6 months", value: "180" },
  //   { label: "1 year", value: "365" }
  // ];

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
      payload: { surveyID: event.target.value }
    });
    //   props.update(dashboard.data, event.target.value)
    console.log(dashboard);
  };

  const labelHandler = (event) => {
    dispatch({
      type: 'LOCATION',
      payload: event.target.value
    });
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
        <DatePicker id="date" selected={startDate} dateFormat="dd/MM/yyyy"
          onChange={(date) => setStartDate(date)} />
        <DatePicker id="date" selected={endDate} dateFormat="dd/MM/yyyy" onChange={(date) => setStartDate(date)} />
      </div>
      <div className={styles.nav}>        {/* <DatePicker selected={startDate} onChange={(date: Date) => setStartDate(date)} /> */}


        {/* </div>
            <div className={styles.nav}> */}

        <button><Link to='/'><IoMdExit /></Link></button>
      </div>
    </div>
  )
}
