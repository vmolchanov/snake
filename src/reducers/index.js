import {combineReducers} from 'redux';

import mode from './mode/mode';
import game from './game/game';

export default combineReducers({
    mode,
    game
});