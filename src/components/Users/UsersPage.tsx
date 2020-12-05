import React from 'react';
import { useSelector } from 'react-redux';
import { Users } from './Users';
import Preloader from '../common/Preloader';
import { getIsFetching } from '../../selectors/users-selectors';

const UsersPage = () => {

    const isFetching = useSelector(getIsFetching)

    return <>
        {isFetching ? <Preloader /> : null}
        <Users />
    </>
}

export default UsersPage