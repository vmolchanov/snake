import './style.css';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
import Field from '../../utils/field/field';

class Game extends Component {
    constructor(props) {
        super(props);

        this.isFirstShow = true;

        this.containerRef = React.createRef();
        this.overlayRef = React.createRef();
        this.svgRef = React.createRef();

        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.handleOverlayClick = this.handleOverlayClick.bind(this);
        this.handleScreenResize = this.handleScreenResize.bind(this);
        this.handleContainerSwipe = this.handleContainerSwipe.bind(this);
    }

    componentDidMount() {
        this.isFirstShow = false;

        document.addEventListener('keyup', this.handleKeyUp);
        window.addEventListener('resize', this.handleScreenResize);

        const swipes = ['swipeup', 'swiperight', 'swipedown', 'swipeleft'];
        const hammertime = new Hammer(this.containerRef.current);
        hammertime.get('swipe').set({
            direction: Hammer.DIRECTION_ALL
        });
        swipes.forEach((eventName) =>
            hammertime.on(eventName, this.handleContainerSwipe)
        );

        this.setSvgSizes();
    }

    componentWillUnmount() {
        document.removeEventListener('keyup', this.handleKeyUp);
        window.removeEventListener('resize', this.handleScreenResize);
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

        const {field} = this.props.field;

        return (
            <div className='Game' ref={this.containerRef}>
                {this.props.mode === 0 ? <Redirect to='/' /> : null}
                <div
                    className='Game__overlay'
                    onClick={this.handleOverlayClick}
                    ref={this.overlayRef}
                >
                    <p className='Game__overlay-text'>Нажмите для начала игры</p>
                    <ul className={controlClassNames}>
                        {controlImages.map(({src, alt}, index) => (
                            <li className="Game__control-item" key={index}>
                                <img
                                    src={src}
                                    className="Game__control-image"
                                    alt={alt}
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
                    {field.map((row, index) => (
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
            } catch (err) {
                clearInterval(interval);
                this.showOverlay();
            }
        }, this.props.mode);
    }

    /**
     * Устанавливает размер svg-полю в зависимости от размера родительского контейнера.
     */
    setSvgSizes() {
        const { width, height } = this.containerRef.current.getBoundingClientRect();
        let size = Math.min(Math.floor(width), Math.floor(height));
        // 90% от размера контейнера
        size = Math.floor(size * 0.9);
        this.svgRef.current.style.width = `${size}px`;
        this.svgRef.current.style.height = `${size}px`;
    }

    handleKeyUp(e) {
        switch (e.which) {
            case EKey.ARROW_UP:
                return this.props.onDirectionChange(EDirection.TOP);
            case EKey.ARROW_RIGHT:
                return this.props.onDirectionChange(EDirection.RIGHT);
            case EKey.ARROW_DOWN:
                return this.props.onDirectionChange(EDirection.BOTTOM);
            case EKey.ARROW_LEFT:
                return this.props.onDirectionChange(EDirection.LEFT);
            default:
                return;
        }
    }

    handleContainerSwipe(e) {
        switch (e.type) {
            case EGesture.SWIPE_UP:
                return this.props.onDirectionChange(EDirection.TOP);
            case EGesture.SWIPE_RIGHT:
                return this.props.onDirectionChange(EDirection.RIGHT);
            case EGesture.SWIPE_DOWN:
                return this.props.onDirectionChange(EDirection.BOTTOM);
            case EGesture.SWIPE_LEFT:
                return this.props.onDirectionChange(EDirection.LEFT);
            default:
                return;
        }
    }

    handleOverlayClick(e) {
        e.preventDefault();
        this.hideOverlay();
        this.start();
    }

    handleScreenResize(e) {
        this.setSvgSizes();
    }
}

Game.propTypes = {
    mode: PropTypes.number,
    field: PropTypes.instanceOf(Field),
    onDirectionChange: PropTypes.func.isRequired,
    onMove: PropTypes.func.isRequired,
    onStartGame: PropTypes.func.isRequired
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