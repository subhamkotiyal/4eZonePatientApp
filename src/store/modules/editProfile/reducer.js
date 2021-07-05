import {
  PROFILEIM_REQUESTED, PROFILE_REQUESTED,
  PROFILEIM_UPLOADED, PROFILE_UPLOADED,
  EDITPROFILE_FAIL
} from './types';
const INITIAL_STATE = {
  profileData: null,
  data: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
      case PROFILEIM_REQUESTED:
          return {
              ...state,
          };
      case PROFILE_REQUESTED:
          return {
              ...state,
          };

      case PROFILEIM_UPLOADED:
          return {
              ...state,
              profileData: action.data
          };
      case PROFILE_UPLOADED:
          return {
              ...state,
              profileData: action.data
          };


      case EDITPROFILE_FAIL:
          return {
              ...state,
          };
      default:
          return state;
  }
};
