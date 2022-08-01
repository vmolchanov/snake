import {FIELD_CHANGE_DIRECTION, FIELD_MOVE, FIELD_RESET} from '@constants';

export const moveSnake = () => {
  return {
    type: FIELD_MOVE,
    payload: null
  };
};

export const changeDirection = (direction) => {
  return {
    type: FIELD_CHANGE_DIRECTION,
    payload: direction
  };
};

export const resetGame = () => {
  return {
    type: FIELD_RESET,
    payload: null
  };
};
