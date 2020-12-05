import React from 'react';
import styles from './Users.module.css';
import userPhoto from '../../assets/user.png';
import { NavLink } from 'react-router-dom';
import { UserType } from '../../types/types';
import { Button } from 'antd';

type UserTypes = {
    user: UserType 
    followingInProgress: Array<number> 
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}

const User: React.FC<UserTypes> = ({user, followingInProgress, unfollow, follow}) => {
    return <div className={styles.user}>
        <NavLink to={`profile/${user.id}`}>
            <img src={user.photos.small ? user.photos.small : userPhoto} alt='' />
        </NavLink>
        <div className={styles.text}>
            <h3>{user.name}</h3>
            <p>{user.status}</p>
        </div>
        {user.followed
            ? <Button type="primary" disabled={followingInProgress.some(id => id === user.id)} onClick={() => { 
                unfollow(user.id)
            }}>Unfollow</Button>
            : <Button type="primary" disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                follow(user.id)
            }}>Follow</Button>}
    </div>
}

export default User;