import React, { ChangeEvent, useState } from 'react';
import styles from './ProfileInfo.module.css';
import userPhoto from '../../../assets/user.png';
import PhotoEditor from '../../common/PhotoEditor/PhotoEditor';

type PropsType = {
    photo: string | null
    isOwner: boolean
    savePhoto: (file: File) => Promise<any>
}

const Avatar: React.FC<PropsType> = ({photo, isOwner, savePhoto}) => {
    let [selectedImage, setSelectedImage] = useState<any>();
    let [editMode, setEditMode] = useState(false);
    const onAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.length) {
            const file = event.target.files[0];
            let reader = new FileReader();
            reader.onload = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
            setEditMode(true);
        }
    }
    return <div className={styles.avatar}>
        <img className={styles.avatarImg} src={photo || userPhoto} alt='avatar' />
        {isOwner &&
            <div className={styles.uploadPhoto}>
                <input type="file" id="uploadPhoto" accept="image/png, image/jpeg" onChange={onAvatarChange} />
                <label htmlFor="uploadPhoto">Upload</label>
            </div>}
        {editMode && <PhotoEditor image={selectedImage} savePhoto={savePhoto} setEditMode={setEditMode} />}
    </div>
}

export default Avatar;