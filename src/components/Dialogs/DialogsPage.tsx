import React from 'react';
import { Dialogs } from './Dialogs';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUserId } from '../../selectors/auth-selectors';

const DialogsPage = () => {
    const userId = useSelector(getUserId)
    return <>
        {userId ? <Dialogs /> : <Redirect to="/login"/>}
    </>
}

export default DialogsPage