import {MODE_SET_MODE} from '@constants';

export const setMode = (mode) => ({
  type: MODE_SET_MODE,
  payload: mode
});
