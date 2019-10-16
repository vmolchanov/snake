import {combineReducers} from 'redux';

import mode from './mode';
import game from './game';

export default combineReducers({
    mode,
    game
});