import React, { FC } from 'react';
import styles from './Profile.module.css';
import Posts from './Posts/Posts';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import { ProfileType } from '../../types/types';

type PropsType = {
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => Promise<any>
    saveProfile: (profile: ProfileType) => Promise<any>
}

const Profile: FC<PropsType> = (props) => {
    return <div className={styles.profile}>
        <ProfileInfo {...props} />
        <Posts />
    </div>
}

export default Profile;