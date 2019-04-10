import EMode from '../enums/mode';

const initialState = 0;

export default function mode(state = initialState, action) {
    switch (action.type) {
        case 'SET_MODE':
            switch (parseInt(action.payload)) {
                case EMode.UNDEFINED:
                    return 0;
                case EMode.EASY:
                    return 300;
                case EMode.HARD:
                    return 180;
            }
        default:
            return state;
    }
}