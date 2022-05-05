import { useState, useEffect } from "react";
import axios from "axios";
import Table from "../components/table/Table";
import styles from "./Surveys.module.css"

export default function Surveys() {
    const URL_SURVEY_API = 'http://localhost:4000/api/surveys';
    const [selectSurvey, setSelectSurvey] = useState([]);

    useEffect (() => { 
        axios.get(URL_SURVEY_API)
          .then(response => {
            const data = response.data;
            setSelectSurvey(data);
          })
          .catch((error)=> console.log(error.message));
      },[]);

    return (
        <div className={styles.surveys}>
            <div className={styles.data}>
                <h1>Existing Surveys</h1>
                <p>Copy paste link in browser to access to a particular survey</p>
                <Table selectSurvey={selectSurvey}/>
            </div>
      </div>
    )
}
