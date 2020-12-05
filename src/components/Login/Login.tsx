import React from 'react';
import { connect } from 'react-redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { maxLengthCreator, required } from '../../utils/validators';
import { Input } from '../common/FormsControls/FormsControls';
import { login } from '../../redux/auth-reducer';
import styles from './Login.module.css';
import formErrorStyle from '../common/FormsControls/FormsControls.module.css'
import { Redirect } from 'react-router-dom';
import { AppStateType } from '../../redux/store';
import { Button } from 'antd';

const maxLength30 = maxLengthCreator(30);

type LoginFormOwnProps = {
    captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({handleSubmit, error, captchaUrl}) => {
    return <form onSubmit={handleSubmit}>
        <Field className={styles.loginField} component={Input} validate={[required, maxLength30]} name='email' placeholder='Email' />
        <Field className={styles.loginField} component={Input} validate={[required, maxLength30]} name='password' type='password' placeholder='Password' />
        <Field component='input' type='checkbox' name='rememberMe' />
        <span className={styles.rememberMe}>remember me</span>
        { error && <div className={formErrorStyle.formSummaryError}>{error}</div>}
        { captchaUrl && <img src={captchaUrl} alt='captcha' />}
        { captchaUrl && <Field component={Input} name='captcha' placeholder='Symbols from image' validate={[required]} />}
        <Button type="primary" htmlType="submit" className={styles.loginBtn}>Login</Button>
    </form>
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({
    form: 'login'
})(LoginForm);

type MapStateLoginType = {
    isAuth: boolean
    captchaUrl: string | null
}

type MapDispatchLoginType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string | null) => void
}

type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string | null
}

const Login: React.FC<MapStateLoginType & MapDispatchLoginType> = (props) => {
    const onSubmit = (values: LoginFormValuesType) => {
        props.login(values.email, values.password, values.rememberMe, values.captcha);
    }
    if (props.isAuth) {
        return <Redirect to='/profile' />
    }
    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl = {props.captchaUrl} />
    </div>
}

const mapStateToProps = (state: AppStateType): MapStateLoginType => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})

export default connect(mapStateToProps, { login })(Login);