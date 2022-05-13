import React from 'react';
import styles from './EndMessage.module.css';
import CheckIcon from '@mui/icons-material/Check';

const EndMessage = (props) => {
    return (
        <div className={styles.main}>
            <div className={styles.valueWrapper}>
                <div className={styles.value}>
                    <CheckIcon className={styles.CheckedIcon}
                        sx={{ color: "#545454" }}
                        style={{ fontSize: 150 }}
                    ></CheckIcon>
                </div>
                <div className={styles.valueMessage}>
                    <p className={styles.message}>Your reply was registered.</p>
                    <p className={styles.message}>We value your time!</p>
                </div>
            </div>
        </div>
    )
};

export default EndMessage;