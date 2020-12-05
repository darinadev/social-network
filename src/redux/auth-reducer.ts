import { FormAction, stopSubmit } from "redux-form";
import { ResultCodeForCaptcha, ResultCodes } from "../api/api";
import { authAPI } from "../api/auth-api";
import { securityAPI } from "../api/security-api";
import { BaseThunkType, PropertiesTypes } from "./store";

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
}

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'SET_AUTH_USER_DATA':
        case 'SET_CAPTCHA_URL':
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
}

export const actions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: 'SET_AUTH_USER_DATA',
        payload: { userId, email, login, isAuth }
    } as const),
    setCaptchaUrl: (captchaUrl: string) => ({
        type: 'SET_CAPTCHA_URL',
        payload: { captchaUrl }
    } as const)
}

export const getAuthUserData = (): ThunkType => async (dispatch) => {
    const response = await authAPI.getAuthUserData();
    if (response.resultCode === 0) {
        let { id, email, login } = response.data;
        dispatch(actions.setAuthUserData(id, email, login, true));
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string | null): ThunkType =>
    async (dispatch) => {
        const response = await authAPI.login(email, password, rememberMe, captcha);
        if (response.resultCode === ResultCodes.Success) {
            dispatch(getAuthUserData());
        } else {
            if (response.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
                dispatch(getCaptchaUrl());
            }
            let message = response.messages.length > 0 ? response.messages[0] : 'Some error';
            dispatch(stopSubmit('login', { _error: message }))
        }
    }

export const logout = (): ThunkType => async (dispatch) => {
    const response = await authAPI.logout();
    if (response.resultCode === 0) {
        dispatch(actions.setAuthUserData(null, null, null, false));
    }
}

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    const response = await securityAPI.getCaptchaUrl();
    const captchaUrl = response.data.url;
    dispatch(actions.setCaptchaUrl(captchaUrl));
}

export default authReducer;

export type InitialStateType = typeof initialState
type ActionsTypes = ReturnType<PropertiesTypes<typeof actions>>
type ThunkType = BaseThunkType<ActionsTypes | FormAction>