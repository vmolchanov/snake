import './style.css';
import  React from 'react';

function Mode(props) {
    return (
        <div className='Mode'>
            <ul className='Mode__list'>
                <li className='Mode__item'>
                    <a href='/game' className='Mode__link'>Легко</a>
                </li>
                <li className='Mode__item'>
                    <a href='/game' className='Mode__link'>Сложно</a>
                </li>
            </ul>
        </div>
    );
}

export default Mode;