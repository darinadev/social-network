import React from 'react';
import styles from './Dialogs.module.css';

type PropsType = {
    id: number
    message: string
}

const Message: React.FC<PropsType> = ({message}) => {
    return <div className={styles.message}>
        <p>{message}</p>
    </div>
}

export default Message;