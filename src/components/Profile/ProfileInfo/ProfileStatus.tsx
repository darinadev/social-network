import React, { useState, useEffect, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { updateStatus } from '../../../redux/profile-reducer';
import styles from './ProfileInfo.module.css';

type PropsType = {
    status: string
    isOwner: boolean
}

const ProfileStatus = (props: PropsType) => {

    const dispatch = useDispatch()
    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState<string>(props.status);
    useEffect(() => {
        setStatus(props.status);
    },[props.status])
    const activateEditMode = () => {
        if(props.isOwner) setEditMode(true);
    }
    const deactivateEditMode = () => {
        setEditMode(false);
        dispatch(updateStatus(status));
    }
    const onStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
        setStatus(event.target.value);
    }
    return <div className={styles.status}>
        {!editMode &&
            <span onDoubleClick={activateEditMode}>{props.status || '-----------'}</span>}
        {editMode &&
            <input autoFocus={true} onBlur={deactivateEditMode}
                onChange={onStatusChange} value={status} />}
    </div>
}

export default ProfileStatus;