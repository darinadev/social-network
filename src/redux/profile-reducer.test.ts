import React from 'react';
import profileReducer, {actions} from './profile-reducer';

let state = {
    posts: [
        { id: 1, message: 'Hello, how are you?', likesCount: 0 },
        { id: 2, message: 'Hi, everything is fine', likesCount: 0 },
        { id: 3, message: 'Amazing', likesCount: 0 }
    ],
    newPostText: '',
    profile: null,
    status: ''
}

test('length of the post should be incremented', () => {
    let action = actions.addPost('text');
    let newState = profileReducer(state, action);
    expect (newState.posts.length).toBe(4);
});

test('message of new post should be correct', () => {
    let action = actions.addPost('text');
    let newState = profileReducer(state, action);
    expect (newState.posts[0].message).toBe('text');
});

test('after deleting length of the posts should be decremented', () => {
    let action = actions.deletePost(1);
    let newState = profileReducer(state, action);
    expect (newState.posts.length).toBe(2);
});

test('after deleting length should not be decremented if id is incorrect', () => {
    let action = actions.deletePost(1000);
    let newState = profileReducer(state, action);
    expect (newState.posts.length).toBe(3);
});

test('status should be added', () => {
    let action = actions.setStatus('some status');
    let newState = profileReducer(state, action);
    expect (newState.status).toBeTruthy();
});

test('after adding status should be correct', () => {
    let action = actions.setStatus('some status');
    let newState = profileReducer(state, action);
    expect (newState.status).toBe('some status');
});