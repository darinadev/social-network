import { Button } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { AppStateType } from '../../../redux/store';
import { ProfileType } from '../../../types/types';
import OuterLink from '../../common/OuterLink';
import styles from './ProfileInfo.module.css';
import ProfileStatus from './ProfileStatus';

type PropsType = {
    isOwner: boolean
    activateEditMode: () => void
    profile: ProfileType
}

const ProfileData: React.FC<PropsType> = ({ isOwner, profile, activateEditMode }) => {

    const status = useSelector((state: AppStateType) => state.profilePage.status)
    return <div>
        <ProfileStatus status={status} isOwner={isOwner} />
        <h3 className={styles.profileName}>{profile.fullName}</h3>
        <div className={styles.profileData}>
            {profile.aboutMe && <h4>About me:</h4>}
            {profile.aboutMe && <p>{profile.aboutMe}</p>}
            <h4>Looking for a job:</h4>{profile.lookingForAJob ? <p>yes</p> : <p>no</p>}
            {profile.lookingForAJob && <h4>My professional skills:</h4>}
            {profile.lookingForAJob && <p>{profile.lookingForAJobDescription}</p>}
            <h4>Contacts:</h4>
            <SocialNetworks profile={profile} />
        </div>
        {isOwner &&
            <Button htmlType="submit" onClick={activateEditMode}>Edit profile</Button>}
    </div>
}

const SocialNetworks: React.FC<{ profile: ProfileType }> = ({ profile }) => {
    return <div className={styles.socialNetworks}>
        {profile.contacts.facebook && <OuterLink linkName='Facebook' link={profile.contacts.facebook} />}
        {profile.contacts.vk && <OuterLink linkName='VK' link={profile.contacts.vk} />}
        {profile.contacts.twitter && <OuterLink linkName='Twitter' link={profile.contacts.twitter} />}
        {profile.contacts.instagram && <OuterLink linkName='Instagram' link={profile.contacts.instagram} />}
        {profile.contacts.youtube && <OuterLink linkName='Youtube' link={profile.contacts.youtube} />}
        {profile.contacts.github && <OuterLink linkName='GitHub' link={profile.contacts.github} />}
        {profile.contacts.website && <OuterLink linkName='Website' link={profile.contacts.website} />}
    </div>
}

export default ProfileData;