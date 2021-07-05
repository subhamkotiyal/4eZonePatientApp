import {SUPPORT_REQUEST, SUPPORT_SUCCESS, SUPPORT_FAILURE} from './types';

const INITIAL_STATE = {
  supportData: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SUPPORT_REQUEST:
      return {
        ...state,
      };
    case SUPPORT_SUCCESS:
      return {
        ...state,
        supportData: action.data,
      };
    case SUPPORT_FAILURE:
      return {
        ...state,
      };
    default:
      return state;
  }
};
