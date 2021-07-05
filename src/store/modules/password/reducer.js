import {
  LOGIN_REQUESTED,
  REQUEST_SUCCESS,
  REQUEST_FAIL,
  LOGOUT_REQUEST_SUCCESS,
  LOGOUT_REQUESTED,
  LOGOUT_REQUEST_FAIL,
  SAVE_FCM_TOKEN_REQUEST,
  SAVE_FCM_TOKEN_SUCCESS
} from './types';

const INITIAL_STATE = {
  loginData: null,
  isBusy: false,
  fcmToken: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_REQUESTED:
      return {
        ...state,
        isBusy: true,
        loginData: null,
      };
    case REQUEST_SUCCESS:
      return {
        ...state,
        isBusy: false,
        loginData: action.data,
      };
    case REQUEST_FAIL:
     return {
        ...state,
        isBusy: false,
        loginData: null,
      };

    //FCM
    case SAVE_FCM_TOKEN_REQUEST:
      return {
        ...state,
        fcmToken: false,
      };

    case SAVE_FCM_TOKEN_SUCCESS:
      return {
        ...state,
        fcmToken: action.data,
      };
    //LOGOUT
    case LOGOUT_REQUESTED:
      return {
        ...state,
        isBusy: true,
        loginData: null,
      };
    case LOGOUT_REQUEST_SUCCESS:
      return {
        ...state,
        isBusy: false,
        loginData: null,
        fcmToken:state.fcmToken
      };
    case LOGOUT_REQUEST_FAIL:
      return {
        ...state,
        isBusy: false,
        loginData: null,
      };
    default:
      return state;
  }
};
