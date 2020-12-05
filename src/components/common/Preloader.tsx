import React from 'react';
import preloader from '../../assets/preloader.svg';

const Preloader = () => {
    return <div>
        <img style={{height: '160px', width: '160px'}} src={preloader} alt='preloader' />
    </div>
}

export default Preloader;