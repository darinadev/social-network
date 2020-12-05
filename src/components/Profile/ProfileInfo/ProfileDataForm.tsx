import { Button } from 'antd';
import React from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { ProfileType } from '../../../types/types';
import { Input, Textarea } from '../../common/FormsControls/FormsControls';
import formErrorStyle from '../../common/FormsControls/FormsControls.module.css';
import styles from './ProfileInfo.module.css';

type ProfileDataFormValuesType = ProfileType

type OwnPropsType = {
    profile: ProfileType
}

const ProfileDataForm: React.FC<InjectedFormProps<ProfileDataFormValuesType, OwnPropsType> & OwnPropsType> = ({handleSubmit, profile, error}) => {
    return <form onSubmit={handleSubmit}>
        <h3 className={styles.profileFormTitle}>Profile data:</h3>
        <div className={styles.profileDataForm}>
            <h4>Name</h4>
            <Field component={Input} placeholder='Name' name='fullName' />
            <h4>About me:</h4>
            <Field component={Textarea} placeholder='About me' name='aboutMe' />
            <h4>Looking for a job</h4>
            <Field component={Input} type='checkbox' name='lookingForAJob' />
            <h4>My professional skills</h4>
            <Field component={Textarea} placeholder='My professional skills' name='lookingForAJobDescription' />
        </div>
        <h3 className={styles.profileFormTitle}>Contacts:</h3>
        <div className={styles.contactsForm}>
            {Object.keys(profile.contacts).map(key => {
                return <div className={styles.contsctsFormItem} key={key}>
                    <h4>{key}</h4>
                    <Field component={Input} name={'contacts.' + key} placeholder={key} />
                </div>
            })}
        </div>
        {error && <div className={formErrorStyle.formSummaryError}>{error}</div>}
        <Button type="primary" htmlType="submit">Save</Button>
    </form>
}

const ProfileDataReduxForm = reduxForm<ProfileDataFormValuesType, OwnPropsType>({
    form: 'profile'
})(ProfileDataForm);

export default ProfileDataReduxForm;