import React, { ComponentType } from 'react';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { AppStateType } from '../redux/store';

const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
})

export const withAuthRedirect = (WrappedComponent: ComponentType) => {
    const RedirectComponent: React.FC<{ isAuth: boolean }> = (props) => {
        const {isAuth, ...restProps} = props

        if (!isAuth) return <Redirect to='/login' />

        return <WrappedComponent {...restProps} />
    }
    let AuthRedirectComponent = connect(mapStateToProps, {})(RedirectComponent);
    return AuthRedirectComponent;
}