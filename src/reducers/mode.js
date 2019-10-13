import EMode from '../enums/mode';

const initialState = 0;

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_MODE':
            switch (parseInt(action.payload)) {
                case EMode.UNDEFINED:
                    return 0;
                case EMode.EASY:
                    return 300;
                case EMode.HARD:
                    return 180;
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

export default reducer;