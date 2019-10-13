import Point from '../utils/point';
import {random} from '../utils/random';
import EDirection from '../enums/direction';

const SIZE = 10;
const FOOD_CELL = -1;
const EMPTY_CELL = 0;

const getFoodPoint = (field) => {
    const points = [];

    field.forEach((row, y) => {
        row.forEach((cell, x) => {
            if (cell === EMPTY_CELL) {
                points.push(new Point(x, y));
            }
        });
    });

    return points[random(0, points.length)];
};

const createEmptyField = () => {
    const field = [...new Array(SIZE)]
        .map(() => [...new Array(SIZE)]
            .map(() => 0));
    return field;
};

const createField = () => {
    const field = createEmptyField();
    field[random(0, field.length)][random(0, field.length)] = 1;
    const foodPoint = getFoodPoint(field);
    field[foodPoint.y][foodPoint.x] = FOOD_CELL;
    return field;
};

const initialState = {
    field: createEmptyField(),
    direction: EDirection.RIGHT
};

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

const getPointByDirection = (point, direction) => {
    switch (direction) {
        case EDirection.TOP:
            return new Point(point.x, point.y - 1);
        case EDirection.RIGHT:
            return new Point(point.x + 1, point.y);
        case EDirection.BOTTOM:
            return new Point(point.x, point.y + 1);
        case EDirection.LEFT:
            return new Point(point.x - 1, point.y);
        default:
            return new Point();
    }
};

const getPointByPart = (field, part, from = null) => {
    if (from !== null) {
        const coords = [
            new Point(from.x, from.y - 1),
            new Point(from.x + 1, from.y),
            new Point(from.x, from.y + 1),
            new Point(from.x - 1, from.y)
        ];

        for (let i = 0; i < coords.length; i++) {
            const coord = coords[i];
            const isInField = coord.x >= 0 && coord.x < SIZE && coord.y >= 0 && coord.y < SIZE;
            if (isInField && field[coord.y][coord.x] === part) {
                return coord;
            }
        }

        return null;
    }

    for (let i = 0; i < field.length; i++) {
        const j = field[i].indexOf(part);
        if (j !== -1) {
            return new Point(j, i);
        }
    }

    return null;
};

const move = (storeField, direction) => {
    let field = storeField.slice();
    let currentPartPoint = getPointByPart(field, 1);
    let nextPoint = getPointByDirection(currentPartPoint, direction);
    let currentPart = 1;

    // Выход за пределы поля
    if (
        nextPoint.x < 0 ||
        nextPoint.x >= SIZE ||
        nextPoint.y < 0 ||
        nextPoint.y >= SIZE
    ) {
        throw new Error('Выход за пределы поля');
    }

    // Врезание в змейку
    if (field[nextPoint.y][nextPoint.x] > EMPTY_CELL) {
        throw new Error('Врезание в змейку');
    }

    // Еда
    if (field[nextPoint.y][nextPoint.x] === FOOD_CELL) {
        field = field.map((row) =>
            row.map((cell) => 
                cell > 0 ? ++cell : cell
            )
        );
        field[nextPoint.y][nextPoint.x] = 1;
        
        const foodPoint = getFoodPoint(field);
        field[foodPoint.y][foodPoint.x] = FOOD_CELL;

        return field;
    }

    while (currentPartPoint !== null) {
        field[nextPoint.y][nextPoint.x] = currentPart;
        field[currentPartPoint.y][currentPartPoint.x] = EMPTY_CELL;
        nextPoint = currentPartPoint;
        currentPartPoint = getPointByPart(field, ++currentPart, nextPoint);
    }

    return field;
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'MOVE':
            return {
                ...state,
                field: move(state.field, state.direction)
            };
        case 'CHANGE_DIRECTION':
            const direction = action.payload;
            return {
                ...state,
                direction: getDirection(state.direction, direction)
            };
        case 'RESET':
            return {
                field: createField(),
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