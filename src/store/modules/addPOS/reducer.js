import {ADDPOS_REQUEST, ADDPOS_SUCCESS, ADDPOS_FAILURE} from './types';

const INITIAL_STATE = {
  posData: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADDPOS_REQUEST:
      return {
        ...state,
      };
    case ADDPOS_SUCCESS:
      return {
        ...state,
        posData: action.data,
      };
    case ADDPOS_FAILURE:
      return {
        ...state,
      };
    default:
      return state;
  }
};
