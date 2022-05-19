import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from "./FormMobile.module.css";
import axios from "axios";
import Label from './Label';
import { useSelector } from 'react-redux';
import EndMessage from "./EndMesage";
import AccessDenied from "./AccessDenied";


const FormMobile = () => {
    const [survey, setSurvey] = useState({
        question:
            "Would you recommend DreamTeam as the team of a year?",
        comment: true,
    });

    const [showMessage, setShowMessage] = useState(false);
    const [submittable, setSubmittable] = useState(false);
    const [accessable, setAccessable] = useState(true);
    const [scoreMemory, setScoreMemory] = useState(null);
    const [form, setForm] = useState({ score: "", comment: "" });
    const api_url = useSelector((state) => state.api_url);
    const params = useParams();

    useEffect(() => {
        cookieChecker();
        if (accessable) getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getData = () => {
        setScoreMemory(0);
        axios
            .get(api_url + "surveys/" + params.id)
            .then((response) => {
                setSurvey(response.data);
            });
    };
    const textAreaHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };
    const scoreHandler = (event) => {
        setTimeout(() => {
            setForm({ ...form, [event.target.name]: +event.target.value });
            setSubmittable(true)
        }, 600);
    }
    const clickHandler = (event) => {
        if (form.score == event.target.outerText) {
            setSubmittable(true);
            setScoreMemory(form.score);
        }
    }

    const labelsToDisplay = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => {
        if (form.score == item) {
            return <Label key={item} id={item} change={scoreHandler} content={item} name="score" checked={true} onclick={clickHandler} />
        }
        else {
            return <Label key={item} id={item} change={scoreHandler} content={item} name="score" onclick={clickHandler} />
        }

    });

    const submitHandler = (event) => {
        event.preventDefault();
        axios
            .patch(api_url + "update/" + params.id, {
                results: [form],
            })
            .then((response) => {
                console.log(response);
            });
        setForm({ score: "", comment: "" });
        accessSetter();
        setTimeout(() => {
            setShowMessage(true);
        }, 600);
    };
    const returnHandler = (event) => {
        event.preventDefault();
        setSubmittable(false);
        labelsToDisplay();
    }
    const accessSetter = () => {
        let now = new Date();
        let minutes = 1;
        now.setTime(now.getTime() + minutes * 60 * 1000);
        document.cookie = `name=${params.id}; expires=${now.toUTCString()};`;
    };
    const cookieChecker = () => {
        if (document.cookie === `name=${params.id}`) {
            console.log("cookie is set", document.cookie);
            setAccessable(false);
        }
    };
    if (!accessable) {
        return <AccessDenied />
    } else {
        if (showMessage) {
            return <EndMessage />
        }
        else {
            return (
                <div className={styles.mobile}>
                    <div className={styles.question}>
                        <p>
                            {survey.question}
                            <span> *</span>
                        </p>
                    </div>
                    {!submittable &&
                        <>
                            <p className={styles.smallText}>not likely at all</p>
                            <div className={styles.tool}>{labelsToDisplay}
                            </div>
                            <div className={styles.describers}>
                                <p className={styles.smallText}>extreamly likely</p>
                            </div>
                        </>
                    }
                    {submittable &&
                        <>
                            <div className={styles.score}>
                                <input type="text" value={form.score} readOnly></input>
                            </div>

                            {survey.comment && (
                                <div className={styles.precomment}>
                                    <p>Why / Why not?</p>
                                </div>
                            )}
                            {survey.comment && (
                                <textarea
                                    onChange={textAreaHandler}
                                    name="comment"
                                    rows="6"
                                    cols="30"
                                    placeholder="type your message here"
                                    defaultValue={form.comment}
                                />
                            )}
                        </>
                    }

                    <button onClick={submitHandler} disabled={!submittable}>
                        Submit
                    </button>
                    {submittable &&
                        <>
                            <button onClick={returnHandler} className={styles.cancelButton}>Cancel</button>
                        </>
                    }
                </div >
            )
        };
    };
};

export default FormMobile;