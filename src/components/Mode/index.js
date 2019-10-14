import './style.css';
import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import EMode from '../../enums/mode';

import {setMode} from '../../reducers/mode';

const Mode = (props) => {
    const modes = [
        {
            type: EMode.EASY,
            text: 'Легко'
        },
        {
            type: EMode.HARD,
            text: 'Сложно'
        }
    ];

    return (
        <div className='Mode'>
            <ul className='Mode__list'>
                {modes.map((mode, index) => (
                    <li className='Mode__item' key={index}>
                        <Link
                            to='/game'
                            className='Mode__link'
                            onClick={(e) => props.onModeChoose(e.target.dataset.mode)}
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

const mapDispatchToProps = (dispatch) => ({
    onModeChoose: (mode) => {
        dispatch(setMode(mode));
    }
});

export default connect(
    null,
    mapDispatchToProps
)(Mode);
