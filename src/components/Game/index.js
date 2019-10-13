import './style.css';
import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import EDirection from '../../enums/direction';
import EKey from '../../enums/key';
import EGesture from '../../enums/gesture';
import FieldRow from '../FieldRow';
import * as Hammer from 'hammerjs';
import swipeImage from './swipe.svg';
import keysImage from './keys.svg';

import {
    moveSnake,
    changeDirection,
    resetGame
} from '../../reducers/field';

class Game extends Component {
    constructor(props) {
        super(props);

        this.isFirstShow = true;

        this.containerRef = React.createRef();
        this.overlayRef = React.createRef();
        this.svgRef = React.createRef();

        this.onKeyUp = this.onKeyUp.bind(this);
        this.onOverlayClick = this.onOverlayClick.bind(this);
        this.onScreenResize = this.onScreenResize.bind(this);
        this.onContainerSwipe = this.onContainerSwipe.bind(this);
    }

    componentDidMount() {
        this.isFirstShow = false;

        document.addEventListener('keyup', this.onKeyUp);
        window.addEventListener('resize', this.onScreenResize);

        const swipes = ['swipeup', 'swiperight', 'swipedown', 'swipeleft'];
        const hammertime = new Hammer(this.containerRef.current);
        hammertime.get('swipe').set({
            direction: Hammer.DIRECTION_ALL
        });
        swipes.forEach((eventName) => 
            hammertime.on(eventName, this.onContainerSwipe)
        );

        this.setSvgSizes();
    }

    componentWillUnmount() {
        document.removeEventListener('keyup', this.onKeyUp);
        window.removeEventListener('resize', this.onScreenResize);
    }

    render() {
        const controlClassNames = [
            'Game__control-list',
            `${!this.isFirstShow ? 'Game__control-list_hidden' : ''}`
        ].join(' ');
        
        const controlImages = [
            {
                src: keysImage,
                alt: 'Клавиатура'
            },
            {
                src: swipeImage,
                alt: 'Жесты'
            }
        ];
        
        return (
            <div className='Game' ref={this.containerRef}>
                {this.props.mode === 0 ? <Redirect to='/' /> : null}
                <div className='Game__overlay' onClick={this.onOverlayClick} ref={this.overlayRef}>
                    <p className='Game__overlay-text'>Нажмите для начала игры</p>
                    <ul className={controlClassNames}>
                        {controlImages.map((controlImage, index) => (
                            <li className="Game__control-item" key={index}>
                                <img
                                    src={controlImage.src}
                                    className="Game__control-image"
                                    alt={controlImage.alt}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
                <svg
                    className='Game__svg'
                    width='400'
                    height='400'
                    viewBox='0 0 155 155'
                    xmlns='http://www.w3.org/2000/svg'
                    ref={this.svgRef}
                >
                    {/* {this.state.field.map((row, index) => ( */}
                    {this.props.field.map((row, index) => (
                        <FieldRow 
                            row={row}
                            rowIndex={index}
                            key={index}
                        />
                    ))}
                </svg>
            </div>
        );
    }

    showOverlay() {
        this.overlayRef.current.classList.remove('Game__overlay_hidden');
    }

    hideOverlay() {
        this.overlayRef.current.classList.add('Game__overlay_hidden');
    }

    /**
     * Начало игры.
     */
    start() {
        this.props.onStartGame();
        const interval = setInterval(() => {
            try {
                this.props.onMove();
            } catch(err) {
                clearInterval(interval);
                this.showOverlay();
            }
        }, this.props.mode);
    }

    /**
     * Устанавливает размер svg-полю в зависимости от размера родительского контейнера.
     */
    setSvgSizes() {
        const {width, height} = this.containerRef.current.getBoundingClientRect();
        let size = Math.min(Math.floor(width), Math.floor(height));
        // 90% от размера контейнера
        size = Math.floor(size * 0.9);
        this.svgRef.current.style.width = `${size}px`;
        this.svgRef.current.style.height = `${size}px`;
    }

    /**
     * Обработчик события нажатия на кнопку.
     * @param {Object} e 
     */
    onKeyUp(e) {
        switch (e.which) {
            case EKey.ARROW_UP:
                this.props.onDirectionChange(EDirection.TOP);
                break;
            case EKey.ARROW_RIGHT:
                this.props.onDirectionChange(EDirection.RIGHT);
                break;
            case EKey.ARROW_DOWN:
                this.props.onDirectionChange(EDirection.BOTTOM);
                break;
            case EKey.ARROW_LEFT:
                this.props.onDirectionChange(EDirection.LEFT);
                break;
            default:
                break;
        }
    }

    /**
     * Обработчик события свайпа.
     * @param {Object} e 
     */
    onContainerSwipe(e) {
        switch (e.type) {
            case EGesture.SWIPE_UP:
                this.props.onDirectionChange(EDirection.TOP);
                break;
            case EGesture.SWIPE_RIGHT:
                this.props.onDirectionChange(EDirection.RIGHT);
                break;
            case EGesture.SWIPE_DOWN:
                this.props.onDirectionChange(EDirection.BOTTOM);
                break;
            case EGesture.SWIPE_LEFT:
                this.props.onDirectionChange(EDirection.LEFT);
                break;
            default:
                break;
        }
    }

    /**
     * Обработчик события клика на оверлей.
     * @param {Object} e 
     */
    onOverlayClick(e) {
        e.preventDefault();
        this.hideOverlay();
        this.start();
    }

    /**
     * Обработчик события ресайза окна браузера.
     * @param {Object} e 
     */
    onScreenResize(e) {
        this.setSvgSizes();
    }
}

Game.propTypes = {
    mode: PropTypes.number,
    field: PropTypes.array
};

const mapStateToProps = (state, ownProps) => ({
    ...ownProps,
    mode: state.mode,
    field: state.field.field
});

const mapDispatchToProps = (dispatch) => ({
    onDirectionChange: (direction) => {
        dispatch(changeDirection(direction));
    },
    onMove: () => {
        dispatch(moveSnake());
    },
    onStartGame: () => {
        dispatch(resetGame());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Game);