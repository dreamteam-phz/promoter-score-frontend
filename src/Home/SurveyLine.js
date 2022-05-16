import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import styles from './SurveyList.module.css'
import IconButton from "@material-ui/core/IconButton";
import Loader from '../components/loader/Loader';

const URL_SURVEY_API = 'http://localhost:4000/api/';
const url = 'http://localhost:3000/';
const iFrameSRC = `src = "http://localhost:3000/`;
const iFrameSettings = `frameborder="0" width="100%" height="500px"`

// const rerender = () => {
//     setIsLoading(true);
//     axios.get(URL_SURVEY_API)
//         .then(response => {
//             const data = response.data;
//             console.log(data, "in re - create");
//             dispatch({
//                 type: "SURVEYS",
//                 payload: { surveyItems: data },
//             });
//             setIsLoading(false);
//         })
//         .catch((error) => console.log(error.message));
// }
const SurveyLine = () => {
    const data = useSelector((state => state.surveys.surveyItems));
    const linkToSurvey = useSelector((state => state.surveys.linkToSurvey))
    const [linkToForm, setLinkToForm] = useState("");

    const copyHandler = (event) => {
        event.preventDefault();
        navigator.clipboard.writeText(event.currentTarget.value);
    };
    const deleteHandler = (event) => {
        const id = event.currentTarget.value;
        axios.delete(URL_SURVEY_API + 'delete/survey/' + id)
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error)

            })
    }
    console.log(data, "in surveyLine")

    const createListLines = data.map(item => {
        console.log(item);
        return (
            <div className={styles.commentsContainer}>

                <div className={styles.detailsContainer}>
                    <div className={styles.name}>{item.name}</div>
                    <div className={styles.question}>{item.question}</div>
                    <div className={styles.iFrame}>
                        {`<iframe ${iFrameSRC}${linkToSurvey}" ${iFrameSettings}></iframe>`}
                        <IconButton
                            className={styles.button}
                            value={`<iframe ${iFrameSRC}${linkToSurvey}" ${iFrameSettings}></iframe>`} onClick={copyHandler}>
                            <ContentCopyIcon />
                        </IconButton>
                    </div>
                    <div className={styles.surveyUrl}>
                        <a href={url + '' + item._id} target="_blank" rel="noreferrer">
                            link to something
                            {/* {url}{item._id} */}
                        </a>
                        <IconButton
                            className={styles.button}
                            value={url + '' + item._id} onClick={copyHandler}>
                            <ContentCopyIcon />
                        </IconButton>
                    </div>

                </div>
                <div className={styles.delete}>
                    <IconButton
                        className={styles.button}
                        value={item._id}
                        onClick={deleteHandler}
                    >
                        <DeleteOutlineIcon /> delete
                    </IconButton></div>
            </div>
        )
    })

    return (
        <div className={styles.comments}>
            <h2>EARLIER SURVEYS</h2>

            {/* // <div className={styles.commentsContainer}> */}
            {createListLines}
        </div>

    );
};

export default SurveyLine;