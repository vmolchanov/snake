import React from 'react';
import 'normalize.css';
import './style.css';

function Welcome(props) {
    return (
        <div className='welcome'>
            <div className="welcome__logo">
                <span>Snake</span>
            </div>
            <div className="welcome__link">
                <a href='/mode' className='welcome__button'>Играть</a>
            </div>
        </div>
    );
}

export default Welcome;