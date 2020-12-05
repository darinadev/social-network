import React, { useState } from 'react';
import Preloader from '../../common/Preloader';
import styles from './ProfileInfo.module.css';
import Avatar from './Avatar';
import ProfileData from './ProfileData';
import ProfileDataReduxForm from './ProfileDataForm';
import { ProfileType } from '../../../types/types';
import { useSelector } from 'react-redux';
import { AppStateType } from '../../../redux/store';

type PropsType = {
    saveProfile: (profile: ProfileType) => Promise<any>
    isOwner: boolean
    savePhoto: (file: File) => Promise<any>
}

const ProfileInfo: React.FC<PropsType> = ({saveProfile, isOwner, savePhoto}) => {

    const profile = useSelector((state: AppStateType) => state.profilePage.profile)

    const [editMode, setEditMode] = useState(false)

    if (!profile) {
        return <Preloader />
    }
    const onSubmit = (values: ProfileType) => {
        // todo: remove then
        saveProfile(values).then(() => {
            setEditMode(false);
        })
    }
    return <div className={styles.profileInfo}>
        <Avatar photo={profile.photos.large} isOwner={isOwner} savePhoto={savePhoto} />
        <div>
            {editMode
                ? <ProfileDataReduxForm
                    initialValues={profile}
                    profile={profile}
                    onSubmit={onSubmit} />
                : <ProfileData profile={profile}
                    isOwner={isOwner}
                    activateEditMode={() => setEditMode(true)} />}
        </div>
    </div>
}

export default ProfileInfo;