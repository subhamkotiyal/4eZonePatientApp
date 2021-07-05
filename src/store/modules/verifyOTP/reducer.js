import {
  RESET_SUCCESS,
  CLEAR_OTP_SUCCESS,
  CLEAR_OTP_REQUEST,
  REQUEST_RESET,
  RESET_FAIL,
} from './types';

const INITIAL_STATE = {
  resetData: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_RESET:
      return {
        ...state,
        resetData: null,
      };
    case RESET_SUCCESS:
      return {
        ...state,
        resetData: action.data,
      };
    case RESET_FAIL:
      return {
        ...state,
        resetData: null,
      };
    case CLEAR_OTP_REQUEST:
      return {
        ...state,
        resetData: null,
      };

    case CLEAR_OTP_SUCCESS:
      return {
        ...state,
        resetData: null,
      };
    default:
      return state;
  }
};
