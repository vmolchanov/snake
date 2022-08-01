import React, {useEffect, useRef} from 'react';
import {Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {GameViewTemplate} from './game-view';
import {changeDirection, moveSnake, resetGame} from '@actions';
import {useFirstView, useOverlay, useSvg, useContainer} from './hooks';
import * as Hammer from 'hammerjs';
import keysImage from './assets/keys.svg';
import swipeImage from './assets/swipe.svg';
import Field from '@utils/field/field';
import {EDirection, EGesture, EKey} from '@utils/enums';

const SWIPES = ['swipeup', 'swiperight', 'swipedown', 'swipeleft'];

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

const GameView = (props) => {
  const {mode, field, onDirectionChange, onStartGame, onMove} = props;

  const [overlayRef, {showOverlay, hideOverlay}] = useOverlay(useRef(null));
  const [containerRef, {getContainerHeight, getContainerWidth}] = useContainer(useRef(null));
  const [svgRef, {setSvgHeight, setSvgWidth}] = useSvg(useRef(null));

  const [isFirstView, {setViewed}] = useFirstView(true);

  const changeDirection = (where) => {
    switch (where) {
      case EKey.ARROW_UP:
      case EGesture.SWIPE_UP:
        return onDirectionChange(EDirection.TOP);
      case EKey.ARROW_RIGHT:
      case EGesture.SWIPE_RIGHT:
        return onDirectionChange(EDirection.RIGHT);
      case EKey.ARROW_DOWN:
      case EGesture.SWIPE_DOWN:
        return onDirectionChange(EDirection.BOTTOM);
      case EKey.ARROW_LEFT:
      case EGesture.SWIPE_LEFT:
        return onDirectionChange(EDirection.LEFT);
      default:
        return;
    }
  };

  const onDocumentKeyUp = ({which}) => {
    changeDirection(which);
  };

  const onContainerSwipe = ({type}) => {
    changeDirection(type);
  };

  const setSvgSizes = () => {
    const size = Math.floor(Math.min(getContainerWidth(), getContainerHeight()) * 0.9);
    setSvgWidth(size);
    setSvgHeight(size);
  };

  const onWindowResize = () => {
    setSvgSizes();
  };

  const start = () => {
    onStartGame();
    const interval = setInterval(() => {
      try {
        onMove();
      } catch (err) {
        clearInterval(interval);
        showOverlay();
      }
    }, mode);
  };

  const onOverlayClick = (e) => {
    e.preventDefault();
    hideOverlay();
    start();
  };

  const controlClassNames = ['Game__control-list'];
  if (!isFirstView) {
    controlClassNames.push('Game__control-list_hidden');
  }

  useEffect(() => {
    setViewed();

    document.addEventListener('keyup', onDocumentKeyUp);
    window.addEventListener('resize', onWindowResize);

    const hammertime = new Hammer(containerRef.current);
    hammertime.get('swipe').set({direction: Hammer.DIRECTION_ALL});
    SWIPES.forEach(eventName => hammertime.on(eventName, onContainerSwipe));

    setSvgSizes();

    return () => {
      document.removeEventListener('keyup', onDocumentKeyUp);
      window.removeEventListener('resize', onWindowResize);
    };
  });

  if (mode === 0) {
    return <Redirect to='/' />;
  }

  return (
    <GameViewTemplate
      containerRef={containerRef}
      controlClassNames={controlClassNames.join(' ')}
      controlImages={controlImages}
      field={field.field}
      handleOverlayClick={onOverlayClick}
      overlayRef={overlayRef}
      svgRef={svgRef}
    />
  );
};

GameView.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(GameView);
