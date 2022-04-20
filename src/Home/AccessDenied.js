import React from 'react';
import styles from "./AccessDenied.module.css";

const AccessDenied = () => {
    return (
        < div className={styles.cookieMessage}>
            <p className={styles.message}>You have already replied to this survey.
                <br />Please try again later.
            </p>
        </div>
    );
};

export default AccessDenied;