import {SUPPORT_REQUEST, SUPPORT_SUCCESS, SUPPORT_FAILURE} from './types';

export const supportRequest = (data, navigation) => ({
  type: SUPPORT_REQUEST,
  data,
  navigation,
});
export const supportSuccess = data => ({
  type: SUPPORT_SUCCESS,
  data,
});
export const supportFail = () => ({
  type: SUPPORT_FAILURE,
});
