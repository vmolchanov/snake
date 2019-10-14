import {combineReducers} from 'redux';

import mode from './mode';
import field from './field';

export default combineReducers({
    mode,
    field
});