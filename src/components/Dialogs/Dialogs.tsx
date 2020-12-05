import React from 'react';
import styles from './Dialogs.module.css';
import Dialog from './Dialog';
import Message from './Message';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { Textarea } from '../common/FormsControls/FormsControls';
import { maxLengthCreator, required } from '../../utils/validators';
import { DialogType, MessageType } from '../../types/types';
import { useDispatch, useSelector } from 'react-redux';
import { getDialogs, getMessages } from '../../selectors/dialogs-selectors';
import { actions } from '../../redux/dialogs-reducer';
import { Button } from 'antd';

type PropsType = {}

type DialogsFormValuesType = {
    message: string
}

export const Dialogs: React.FC<PropsType> = (props) => {

    const dialogs = useSelector(getDialogs)
    const messages = useSelector(getMessages)

    const dispatch = useDispatch()

    let dialogsItem = dialogs.map((dialog: DialogType) => <Dialog id={dialog.id} key={dialog.id}
        name={dialog.name} avatar={dialog.avatar} />)

    let messagesItem = messages.map((message: MessageType) => <Message id={message.id} key={message.id}
        message={message.message} />)

    const onAddMessage = (values: DialogsFormValuesType) => {
        dispatch(actions.sendMessage(values.message))
    }

    return <div className={styles.dialogs}>
        <div className={styles.dialogsList}>{dialogsItem}</div>
        <div className={styles.messages}>
            {messagesItem}
            <AddMessageReduxForm onSubmit={onAddMessage} />
        </div>
    </div>
}

const maxLength10 = maxLengthCreator(10);

const AddMessageForm: React.FC<InjectedFormProps<DialogsFormValuesType>> = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <Field component={Textarea} validate={[required, maxLength10]} name='message' placeholder='Text your message...' />
        <Button type="primary" htmlType="submit">Send</Button>
    </form>
}

const AddMessageReduxForm = reduxForm<DialogsFormValuesType> ({
    form: 'addMessageForm'
})(AddMessageForm);