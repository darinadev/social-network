import { UserType } from '../types/types'
import { ApiResponseType, instance } from './api'

type GetUsersType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}

export const usersAPI = {
    async getUsers(currentPage = 1, pageSize = 10, friend: null | boolean = null, term: string = '') {
        const response = await instance.get<GetUsersType>(`users?page=${currentPage}&count=${pageSize}` +
            (friend !== null ? `&friend=${friend}` : '') + (term ? `&term=${term}` : ''));
        return response.data;
    },
    async unfollow(userId: number) {
        const response = await instance.delete<ApiResponseType>(`follow/${userId}`);
        return response.data;
    },
    async follow(userId: number) {
        const response = await instance.post<ApiResponseType>(`follow/${userId}`);
        return response.data;
    }
}