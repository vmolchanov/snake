import EMode from '../../enums/mode';

const EASY_VALUE = 300;
const HARD_VALUE = 300;

const initialState = 0;

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_MODE':
            switch (parseInt(action.payload)) {
                case EMode.EASY:
                    return EASY_VALUE;
                case EMode.HARD:
                    return HARD_VALUE;
                default:
                    return 0;
            }
        default:
            return state;
    }
};

export const setMode = (mode) => ({
    type: 'SET_MODE',
    payload: mode
});

export {initialState, EASY_VALUE, HARD_VALUE};

export default reducer;