import {
    MOBILE_SUCCESS,
    MOBILE_REQUESTED,
    LOGIN_WITH_SOCIAL_REQUEST,
    LOGIN_WITH_SOCIAL_SUCCESS,
    MOBILE_FAIL,
    BASIC_SETTING_FAIL,
    BASIC_SETTING_SUCCESS
  } from './types';

  const INITIAL_STATE = {
    mobileData: null,
    basicSetting:null,
    socialData: null,
  };

  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case MOBILE_REQUESTED:
        return {
          ...state,
        };
      case LOGIN_WITH_SOCIAL_REQUEST:
        return {
          ...state,
        };
      case MOBILE_SUCCESS:
        return {
          ...state,
          mobileData: action.data,
        };
      case LOGIN_WITH_SOCIAL_SUCCESS:
        return {
          ...state,
          socialData: action.data,
        };
      case MOBILE_FAIL:
        return {
          ...state,
        };
        case BASIC_SETTING_SUCCESS:
          return {
            ...state,
            basicSetting: action.data,
          };
          case BASIC_SETTING_FAIL:
            return {
              ...state,
              basicSetting: null,
            };
      default:
        return state;
    }
  };
  