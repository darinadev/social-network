import { ApiResponseType, instance, ResultCodes, ResultCodeForCaptcha } from './api'

type GetAuthUserDataType = {
    id: number
    email: string
    login: string
}

type LoginType = {
    userId: number
}

export const authAPI = {
    async getAuthUserData() {
        const response = await instance.get<ApiResponseType<GetAuthUserDataType>>('auth/me');
        return response.data;
    },
    async login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        const response = await instance.post<ApiResponseType<LoginType, ResultCodes | ResultCodeForCaptcha>>(`auth/login`, { email, password, rememberMe, captcha });
        return response.data;
    },
    async logout() {
        const response = await instance.delete<ApiResponseType>(`auth/login`);
        return response.data;
    }
} 