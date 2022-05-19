import React from 'react';
import styles from "./AccessDenied.module.css";
import { MdOutlineDoNotDisturbOff } from 'react-icons/md'

const AccessDenied = () => {
    return (
        < div className={styles.cookieMessage}>
            <div className={styles.deniedIcon}>
                <MdOutlineDoNotDisturbOff className={styles.disturbIcon} />
            </div>
            <p className={styles.message}>You have already replied to this survey.
                <br />Please try again later.
            </p>
        </div>
    );
};

export default AccessDenied;