import Axios from 'axios';

export const instance = Axios.create({
    withCredentials:true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-Key': 'ec7121f0-fb89-4634-9953-8a261328a587'
    }
})

export enum ResultCodes {
    Success = 0,
    Error = 1
}

export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10
}

export type ApiResponseType<D = {}, RC = ResultCodes> = {
    data: D
    resultCode: RC
    messages: Array<string>
}