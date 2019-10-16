import reducer from './mode';
import {
    setMode,
    initialState,
    EASY_VALUE,
    HARD_VALUE
} from './mode';
import EMode from '../../enums/mode';

describe('Изменение стора', () => {
    it('SET_MODE:EASY', () => {
        const action = setMode(EMode.EASY);
        expect(reducer(initialState, action)).toEqual(EASY_VALUE);
    });
    
    it('SET_MODE:HARD', () => {
        const action = setMode(EMode.HARD);
        expect(reducer(initialState, action)).toEqual(HARD_VALUE);
    });

    it('Не реагирует на некорректное значение режима', () => {
        expect(reducer(initialState, {
            type: 'SET_MODE',
            payload: 6347856247389
        })).toEqual(initialState);
    });
});