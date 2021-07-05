import {
  GETPROFILE_SUCCESS,
  GETPROFILE_REQUEST,
  GETPROFILE_FAILURE,
} from './types';

export const profileRequest = navigation => ({
  type: GETPROFILE_REQUEST,
  navigation,
});

export const profileSuccess = data => ({
  type: GETPROFILE_SUCCESS,
  data,
});
export const profileFail = () => ({
  type: GETPROFILE_FAILURE,
});
