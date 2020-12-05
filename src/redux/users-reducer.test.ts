import React from 'react';
import usersReducer, {actions, InitialStateType} from './users-reducer';

let state: InitialStateType

beforeEach(() => {
    state = {
        users: [
            {id: 0, name: 'John0', status: 'some0', photos: {small: null, large: null}, followed: false},
            {id: 1, name: 'John1', status: 'some1', photos: {small: null, large: null}, followed: false},
            {id: 2, name: 'John2', status: 'some2', photos: {small: null, large: null}, followed: true},
            {id: 3, name: 'John3', status: 'some3', photos: {small: null, large: null}, followed: true}
        ],
        totalUsersCount: 0,
        pageSize: 10,
        currentPage: 1,
        isFetching: false,
        followingInProgress: []
    }
})

test('follow success', () => {
    let action = actions.followSuccess(1);
    let newState = usersReducer(state, action);
    expect (newState.users[1].followed).toBeTruthy();
    expect (newState.users[0].followed).toBeFalsy();
});

test('unfollow success', () => {
    let action = actions.unfollowSuccess(3);
    let newState = usersReducer(state, action);
    expect (newState.users[3].followed).toBeFalsy();
    expect (newState.users[2].followed).toBeTruthy();
});