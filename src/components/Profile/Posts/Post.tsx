import React, { FC } from 'react';
import styles from './Posts.module.css';
import avatar from '../../../assets/user.png';
import deletePost from '../../../assets/close.svg';

type PropsType = {
    id: number
    message: string
    likesCount: number
    deletePost: (postId: number) => void
}

const Post: FC<PropsType> = (props) => {
    return <div>
        <div className={styles.post}>
            <img className={styles.avatar} src={avatar} alt='avatar' />
            <div className={styles.postMessage}>
                <p>{props.message}</p>
            </div>
            <img src={deletePost} alt='del' className={styles.deletePost} onClick={() => props.deletePost(props.id)} />
        </div>
        <div className={styles.like}>
            <div>
                <svg enableBackground="new 0 0 512 512" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg"><g><g><path d="m246.122 477.289c-144.417-126.367-246.122-193.304-246.122-299.774 0-80.513 57.4-146.515 136-146.515 54.544 0 95.017 33.497 120 81.015 24.981-47.515 65.454-81.015 120-81.015 78.609 0 136 66.015 136 146.515 0 106.457-101.572 173.291-246.122 299.773-5.657 4.949-14.1 4.949-19.756.001z" /></g></g></svg>
            </div>
            <span>{props.likesCount}</span>
        </div>
    </div >
}

export default Post;