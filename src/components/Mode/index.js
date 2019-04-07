import './style.css';
import  React, {Component} from 'react';
import {connect} from 'react-redux';
import EMode from '../../enums/mode';
import {Link} from 'react-router-dom';

class Mode extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='Mode'>
                <ul className='Mode__list'>
                    <li className='Mode__item'>
                        <Link
                            to='/game'
                            className='Mode__link'
                            onClick={this.onLinkClick.bind(this)}
                            data-mode={EMode.EASY}
                        >
                            Легко
                        </Link>
                    </li>
                    <li className='Mode__item'>
                        <Link
                            to='/game'
                            className='Mode__link'
                            onClick={this.onLinkClick.bind(this)}
                            data-mode={EMode.HARD}
                        >
                            Сложно
                        </Link>
                    </li>
                </ul>
            </div>
        );
    }

    /**
     * Обработчик события клика на ссылку.
     * @param {Object} e
     */
    onLinkClick(e) {
        this.props.onModeChoose(e.target.dataset.mode);
    }
}

export default connect(
    (state) => ({}),
    (dispatch) => ({
        onModeChoose: (mode) => {
            dispatch({
                type: 'SET_MODE',
                payload: mode
            });
        }
    })
)(Mode);
