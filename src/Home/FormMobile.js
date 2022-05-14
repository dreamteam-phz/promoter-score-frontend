import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from "./FormMobile.module.css";
import axios from "axios";
import Label from './Label';


const FormMobile = () => {
    const [survey, setSurvey] = useState({
        question:
            "Would you recommend DreamTeam as the team of a year?",
        comment: true,
    });

    const [submittable, setSubmittable] = useState(false);
    const [accessable, setAccessable] = useState(true);
    const [form, setForm] = useState({ score: "", comment: "" });
    const params = useParams();
    useEffect(() => {
        cookieChecker();
        if (accessable) getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getData = () => {
        axios
            .get("http://localhost:4000/api/surveys/" + params.id)
            .then((response) => {
                console.log(response.data);
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
        }, 450);
    }
    const clickHandler = (event) => {
        console.log(event.target.outerText);
        if (form.score == event.target.outerText) {
            setSubmittable(true);
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
            .patch("http://localhost:4000/api/update/" + params.id, {
                results: [form],
            })
            .then((response) => {
                console.log(response);
            });
        setForm({ score: "", comment: "" });
        console.log(form.score);
    };
    const returnHandler = (event) => {
        event.preventDefault();
        setSubmittable(false);
        console.log("form.score is", form.score)
    }
    const cookieChecker = () => {
        if (document.cookie === `name=${params.id}`) {
            console.log("cookie is set", document.cookie);
            setAccessable(false);
        }
    };

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
                    <p className={styles.smallText}>extreamly likely</p>
                    <div className={styles.tool}>{labelsToDisplay}
                    </div>
                    <div className={styles.describers}>
                        <p className={styles.smallText}>not likely at all</p>
                    </div>
                </>
            }
            {submittable &&
                <>
                    <div className='score'>
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
    );
};

export default FormMobile;