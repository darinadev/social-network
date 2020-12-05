import {ApiResponseType, instance} from './api'
import { PhotosType, ProfileType } from '../types/types';

type SavePhotoResponseType = {
    photos: PhotosType
}

export const profileAPI = {
    getProfile (userId: number) {
        return instance.get<ProfileType>(`profile/${userId}`).then(res => res.data)
    },
    getStatus (userId: number) {
        return instance.get<string>(`profile/status/${userId}`).then(res => res.data)
    },
    updateStatus (status: string) {
        return instance.put<ApiResponseType>(`profile/status/`,{status: status}).then(res => res.data)
    },
    savePhoto (photo: File) {
        const formData = new FormData();
        formData.append("image", photo);
        return instance.put<ApiResponseType<SavePhotoResponseType>>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => res.data)
    },
    saveProfile (profile: ProfileType) {
        return instance.put<ApiResponseType>(`profile`,profile).then(res => res.data)
    }
}