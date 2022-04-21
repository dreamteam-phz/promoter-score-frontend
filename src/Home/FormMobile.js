import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CloseIcon from "@material-ui/icons/Close";
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

    const [form, setForm] = useState({ score: "", comment: "" });
    const params = useParams();

    const scoreHandler = (event) => {
        setTimeout(() => {
            setForm({ ...form, [event.target.name]: +event.target.value });
            setSubmittable(true)
        }, 3000);
    }

    const labelsToDisplay = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map(item => {
        if (form.score == item) {
            return <Label key={item} id={item} change={scoreHandler} content={item} name="score" checked={true} />
        }
        else {
            return <Label key={item} id={item} change={scoreHandler} content={item} name="score" />
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

    return (
        <div className={styles.main}>
            <CloseIcon className={styles.closeIcon} />
            <div className={styles.question}>
                <p>
                    {survey.question}
                    <span>*</span>
                </p>
            </div>
            {!submittable &&
                <>
                    <p className='small-text'>not likely at all</p>
                    <div className={styles.tool}>{labelsToDisplay}
                    </div>
                    <div className={styles.describers}>
                        <p className='small-text'>extreamly likely</p>
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
                            <p>
                                What is the main reason for your score?
                            </p>
                        </div>
                    )}
                    {survey.comment && (
                        <textarea
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