import { Button } from 'antd';
import React from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { maxLengthCreator, required } from '../../../utils/validators';
import { Textarea } from '../../common/FormsControls/FormsControls';

const maxLength300 = maxLengthCreator(300);

export type AddPostFormValueType = {
    post: string
}

const AddPostForm: React.FC<InjectedFormProps<AddPostFormValueType>> = ({handleSubmit}) => {
    return <form onSubmit={handleSubmit}>
        <Field component={Textarea} validate={[required, maxLength300]} rows='2' name='post' placeholder='Text new post...' />
        <Button type="primary" htmlType="submit">Add post</Button>
    </form>
}

export const AddPostReduxForm = reduxForm<AddPostFormValueType>({form: 'addPostForm'})(AddPostForm);