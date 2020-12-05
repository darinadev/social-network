import { FormAction, stopSubmit } from "redux-form";
import { profileAPI } from "../api/profile-api";
import { PhotosType, PostType, ProfileType } from "../types/types";
import { actions as appActions } from "./app-reducer";
import { BaseThunkType, PropertiesTypes } from "./store";

let initialState = {
    posts: [
        { id: 1, message: 'Hello, how are you?', likesCount: 0 },
        { id: 2, message: 'Hi, everything is fine', likesCount: 0 },
        { id: 3, message: 'Amazing', likesCount: 0 }
    ] as Array<PostType>,
    newPostText: '',
    profile: null as ProfileType | null,
    status: ''
}

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'ADD_POST': return {
            ...state,
            posts: [{ id: 4, message: action.post, likesCount: 0 }, ...state.posts]
        };
        case 'DELETE_POST': return {
            ...state,
            posts: state.posts.filter(post => post.id !== action.postId)
        };
        case 'SET_USER_PROFILE': return {
            ...state, profile: action.profile
        };
        case 'SET_STATUS': return {
            ...state, status: action.status
        };
        case 'SAVE_PHOTO_SUCCESS': return {
            ...state, profile: { ...state.profile, photos: action.photo } as ProfileType
        };
        default:
            return state;
    }
}

export const actions = {
    addPost: (post: string) => ({ type: 'ADD_POST', post } as const),
    deletePost: (postId: number) => ({ type: 'DELETE_POST', postId } as const),
    setUserProfile: (profile: ProfileType) => ({ type: 'SET_USER_PROFILE', profile } as const),
    setStatus: (status: string) => ({ type: 'SET_STATUS', status } as const),
    savePhotoSuccess: (photo: PhotosType) => ({ type: 'SAVE_PHOTO_SUCCESS', photo } as const)
}

export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
    const data = await profileAPI.getProfile(userId);
    dispatch(actions.setUserProfile(data));
}

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    const data = await profileAPI.getStatus(userId);
    dispatch(actions.setStatus(data));
}

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    const data = await profileAPI.updateStatus(status);
    if (data.resultCode === 0) {
        dispatch(actions.setStatus(status));
    } else {
        dispatch(appActions.setError(true, data.messages[0]));
    }
}

export const savePhoto = (photo: File): ThunkType => async (dispatch) => {
    const data = await profileAPI.savePhoto(photo);
    if (data.resultCode === 0) {
        dispatch(actions.savePhotoSuccess(data.data.photos));
    } else {
        dispatch(appActions.setError(true, data.messages[0]));
    }
}

export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const data = await profileAPI.saveProfile(profile);
    if (data.resultCode === 0) {
        if (userId !== null) {
            dispatch(getUserProfile(userId));
        } else {
            throw new Error ('userId can not be null')
        }
    } else {
        dispatch(stopSubmit('profile', { _error: data.messages[0] }));
        // let key = response.data.messages[0].match(/Contacts->(\w+)/)[1].toLowerCase();
        // dispatch(stopSubmit('profile', {
        //     contacts: { [key]: response.data.messages[0] },
        // }));
        return Promise.reject(data.messages[0]);
    }
}

export default profileReducer;

export type InitialStateType = typeof initialState
type ActionsTypes = ReturnType<PropertiesTypes<typeof actions>> | ReturnType<typeof appActions.setError>
type ThunkType = BaseThunkType<ActionsTypes | FormAction>