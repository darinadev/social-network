import React from 'react';
import { DialogType, MessageType } from '../types/types';
import dialogsReducer, {actions} from './dialogs-reducer';

let state = {
    dialogs: [
        { id: 1, name: 'John', avatar: 'https://ichef.bbci.co.uk/news/999/cpsprodpb/A815/production/_89192034_89192033.jpg' },
        { id: 2, name: 'Daenerys', avatar: 'https://img1.looper.com/img/gallery/what-really-happened-to-daenerys-body-after-she-was-murdered/intro-1575380643.jpg' },
        { id: 3, name: 'Sansa', avatar: 'https://s8.cdn.teleprogramma.pro/wp-content/uploads/2018/06/d0f2f9a391cc76a25707011b4d904db6.jpg' },
        { id: 4, name: 'Arya', avatar: 'https://pbs.twimg.com/profile_images/1117701700360581126/4p020QBx_400x400.jpg' },
        { id: 5, name: 'Robb', avatar: 'https://media1.popsugar-assets.com/files/thumbor/7QMPlbSmcLh7gSjHc4sj3FgMh20/fit-in/728xorig/filters:format_auto-!!-:strip_icc-!!-/2014/06/18/762/n/1922283/8b2c419a0b97def8_Robb_Stark_HBO/i/Robb-Stark-Game-Thrones-GIFs.jpg' }
    ] as Array<DialogType>,
    messages: [
        { id: 1, message: 'Hello, how are you?' },
        { id: 2, message: 'Hi, everything is fine' },
        { id: 3, message: 'Amazing' }
    ] as Array<MessageType>
}

test('length of posts should be incremented', () => {
    let action = actions.sendMessage('text');
    let newState = dialogsReducer(state, action);
    expect(newState.messages.length).toBe(4);
})