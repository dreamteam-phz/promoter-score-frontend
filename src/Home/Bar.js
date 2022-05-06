import React from 'react'
import styles from "./Bar.module.css";
import Label from './Label';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';


export default function Bar() {
    const dispatch = useDispatch();

    const labelHandler = (event) => {
        dispatch({
            type: 'LOCATION',
            payload: event.target.value
        });
    }

    return (
        <div className={styles.bar}>
            
            <div className={styles.nav}>
                <Label id='create' name='location' content='Create' change={labelHandler}/>
                <Label id='dashboard' name='location' checked={true} content='Dashboard' change={labelHandler}/>
                <Label id='settings' name='location' content='Existing surveys' change={labelHandler}/>
                <Label id='instructions' name='location' content='Instructions' change={labelHandler}/>
                <button><Link to='/'>Exit</Link></button>
            </div>
        </div>
    )
}
