import {
  GETPROFILE_SUCCESS,
  GETPROFILE_REQUEST,
  GETPROFILE_FAILURE,
} from './types';

const INITIAL_STATE = {
  profileData: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GETPROFILE_REQUEST:
      return {
        ...state,
      };
    case GETPROFILE_SUCCESS:
      return {
        ...state,
        profileData: action.data,
      };
    case GETPROFILE_FAILURE:
      return {
        ...state,
      };
    default:
      return state;
  }
};
