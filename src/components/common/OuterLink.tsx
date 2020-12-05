import React, { FC } from 'react';

type PropsType = {
    link: string
    linkName: string
}

const OuterLink: FC<PropsType> = (props) => {
    let link;
    if (props.link.slice(0,8) === 'https://') {
        link = props.link;
    } else if (props.link.slice(0,7) === 'http://') {
        link = props.link;
    } else {
        link = 'https://' + props.link;
    }
    return <div><a href = {link}>{props.linkName}</a></div>;
}

export default OuterLink;