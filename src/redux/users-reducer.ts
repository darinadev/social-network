import { Dispatch } from "react";
import { ThunkAction } from "redux-thunk";
import { ApiResponseType } from "../api/api";
import { usersAPI } from "../api/users-api";
import { UserType } from "../types/types";
import { AppStateType, PropertiesTypes } from "./store";

let initialState = {
    users: [] as Array<UserType>,
    totalUsersCount: 0,
    pageSize: 10,
    currentPage: 1,
    filter: {
        friend: null as null | boolean,
        term: ''
    },
    isFetching: false,
    followingInProgress: [] as Array<number> //array of users id's
}

export type FilterType = typeof initialState.filter 

export type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'FOLLOW':
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return { ...user, followed: true }
                    }
                    return user;
                })
            };
        case 'UNFOLLOW':
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return { ...user, followed: false }
                    }
                    return user;
                })
            };
        case 'SET_USERS':
            return { ...state, users: action.users };
        case 'SET_TOTAL_USERS_COUNT':
            return { ...state, totalUsersCount: action.usersCount };
        case 'SET_CURRENT_PAGE':
            return { ...state, currentPage: action.currentPage };
        case 'SET_FILTER':
            return { ...state, filter: action.payload };
        case 'SET_IS_FETCHING':
            return { ...state, isFetching: action.isFetching };
        case 'SET_FOLLOWING_IN_PROGRESS':
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        default:
            return state;
    }
}

type ActionsTypes = ReturnType<PropertiesTypes<typeof actions>>

export const actions = {
    followSuccess: (userId: number) => ({ type: 'FOLLOW', userId } as const),
    unfollowSuccess: (userId: number) => ({ type: 'UNFOLLOW', userId } as const),
    setUsers: (users: Array<UserType>) => ({ type: 'SET_USERS', users } as const),
    setTotalUsersCount: (usersCount: number) => ({ type: 'SET_TOTAL_USERS_COUNT', usersCount } as const),
    setCurrentPage: (currentPage: number) => ({ type: 'SET_CURRENT_PAGE', currentPage } as const),
    setFilter: (filter: FilterType) => ({ type: 'SET_FILTER', payload: filter } as const),
    setIsFetching: (isFetching: boolean) => ({ type: 'SET_IS_FETCHING', isFetching } as const),
    setFollowingInProgress: (isFetching: boolean, userId: number) => ({ type: 'SET_FOLLOWING_IN_PROGRESS', isFetching, userId } as const)
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const requestUsers = (page: number, pageSize: number, filter: FilterType): ThunkType => async (dispatch) => {
    dispatch(actions.setIsFetching(true));
    dispatch(actions.setCurrentPage(page));
    dispatch(actions.setFilter(filter))
    const data = await usersAPI.getUsers(page, pageSize, filter.friend, filter.term);
    dispatch(actions.setIsFetching(false));
    dispatch(actions.setUsers(data.items));
    dispatch(actions.setTotalUsersCount(data.totalCount));
}

const followUnfollow = async (dispatch: Dispatch<ActionsTypes>, userId: number, apiMethod: (userId: number) => Promise<ApiResponseType>,
    actionCreator: (userId: number) => ActionsTypes) => {
    dispatch(actions.setFollowingInProgress(true, userId));
    const data = await apiMethod(userId);
    if (data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(actions.setFollowingInProgress(false, userId));
}

export const follow = (userId: number): ThunkType => async (dispatch) => {
    await followUnfollow(dispatch, userId, usersAPI.follow.bind(usersAPI), actions.followSuccess);
}

export const unfollow = (userId: number): ThunkType => async (dispatch) => {
    await followUnfollow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), actions.unfollowSuccess);
}

export default usersReducer;