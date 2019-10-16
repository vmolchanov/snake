import EDirection from '../../enums/direction';
import reducer from './game';
import {
    getDirection,
    moveSnake,
    changeDirection,
    initialState
} from './game';
import Field from '../../utils/field/field';

describe('Изменение направления', () => {
    it('Поворот направо и налево', () => {
        expect(getDirection(EDirection.TOP, EDirection.LEFT)).toBe(EDirection.LEFT);
        expect(getDirection(EDirection.TOP, EDirection.RIGHT)).toBe(EDirection.RIGHT);
    
        expect(getDirection(EDirection.BOTTOM, EDirection.LEFT)).toBe(EDirection.LEFT);
        expect(getDirection(EDirection.BOTTOM, EDirection.RIGHT)).toBe(EDirection.RIGHT);
    
        expect(getDirection(EDirection.LEFT, EDirection.TOP)).toBe(EDirection.TOP);
        expect(getDirection(EDirection.LEFT, EDirection.BOTTOM)).toBe(EDirection.BOTTOM);
    
        expect(getDirection(EDirection.RIGHT, EDirection.TOP)).toBe(EDirection.TOP);
        expect(getDirection(EDirection.RIGHT, EDirection.BOTTOM)).toBe(EDirection.BOTTOM);
    });
    
    it('Нельзя развернуться', () => {
        expect(getDirection(EDirection.TOP, EDirection.BOTTOM)).toBe(EDirection.TOP);
        expect(getDirection(EDirection.BOTTOM, EDirection.TOP)).toBe(EDirection.BOTTOM);
        expect(getDirection(EDirection.LEFT, EDirection.RIGHT)).toBe(EDirection.LEFT);
        expect(getDirection(EDirection.RIGHT, EDirection.LEFT)).toBe(EDirection.RIGHT);
    });
    
    it('Некорректное значение нового направления', () => {
        expect(getDirection(EDirection.TOP, 357864738)).toBe(EDirection.TOP);
    });
});

describe('Изменение стора', () => {
    it('MOVE', () => {
        const initialField = [
            [0, 0, 0, 0, 0],
            [0, 4, 0, 0, 0],
            [0, 3, 2, 1, 0],
            [-1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ];
        const resultField = [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 4, 3, 2, 1],
            [-1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ];
        const field = new Field(5, initialField);
        const state = {...initialState, field};
        const action = moveSnake();
        expect(reducer(state, action)).toEqual({
            ...initialState,
            field: new Field(5, resultField)
        });
    });

    it('CHANGE_DIRECTION', () => {
        const action = changeDirection(EDirection.TOP);
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            direction: EDirection.TOP
        })
    });

    it('Некорректный action', () => {
        expect(reducer(initialState, {
            type: 'undefined_type'
        })).toEqual(initialState)
    });
});
