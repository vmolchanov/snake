import './style.css';
import React from 'react';
import {Link} from 'react-router-dom'

const Welcome = (props) => {
    return (
        <div className='welcome'>
            <div className="welcome__logo">
                <span>Snake</span>
            </div>
            <div className="welcome__link">
                <Link
                    to='/mode'
                    className='welcome__button'
                >
                    Играть
                </Link>
            </div>
        </div>
    );
}

export default Welcome;