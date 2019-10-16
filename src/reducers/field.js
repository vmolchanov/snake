import EDirection from '../enums/direction';

import Field from '../utils/field';

const SIZE = 10;

const getDirection = (currentDirection, newDirection) => {
    switch (currentDirection) {
        case EDirection.TOP:
            return (currentDirection === EDirection.BOTTOM) ? currentDirection : newDirection;
        case EDirection.BOTTOM:
            return (currentDirection === EDirection.TOP) ? currentDirection : newDirection;
        case EDirection.LEFT:
            return (currentDirection === EDirection.RIGHT) ? currentDirection : newDirection;
        case EDirection.RIGHT:
            return (currentDirection === EDirection.LEFT) ? currentDirection : newDirection;
        default:
            return currentDirection;
    }
};

const initialState = {
    field: new Field(SIZE),
    direction: EDirection.RIGHT
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'MOVE':
            return {
                ...state,
                field: state.field.move(state.direction).clone()
            };
        case 'CHANGE_DIRECTION':
            const direction = action.payload;
            return {
                ...state,
                direction: getDirection(state.direction, direction)
            };
        case 'RESET':
            return {
                field: state.field.create().clone(),
                direction: EDirection.RIGHT
            };
        default:
            return state;
    }
};

export const moveSnake = () => {
    return {
        type: 'MOVE',
        payload: null
    };
};

export const changeDirection = (direction) => {
    return {
        type: 'CHANGE_DIRECTION',
        payload: direction
    };
};

export const resetGame = () => {
    return {
        type: 'RESET',
        payload: null
    };
};

export default reducer;