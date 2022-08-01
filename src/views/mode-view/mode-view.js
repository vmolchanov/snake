import './style.css';
import React from 'react';
import {Link} from 'react-router-dom';

export const ModeViewTemplate = (props) => {
  const {modes, onLinkClick} = props;

  return (
    <div className='Mode'>
      <ul className='Mode__list'>
        {modes.map((mode, index) => (
          <li className='Mode__item' key={index}>
            <Link
              to='/game'
              className='Mode__link'
              onClick={onLinkClick}
              data-mode={mode.type}
            >
              {mode.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
