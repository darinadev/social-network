import React from 'react';
import styles from './Dialogs.module.css';
import { NavLink } from 'react-router-dom';

type PropsType = {
    avatar: string
    id: number
    name: string
}

const Dialog: React.FC<PropsType> = ({avatar, id, name}) => {
    return <div className={styles.dialog}>
        <img src={avatar} alt='avatar' />
        <NavLink to={`/dialogs/${id}`} activeClassName={styles.active}>{name}</NavLink>
    </div>
}

export default Dialog;