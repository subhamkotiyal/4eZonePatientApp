import { LOGIN_REQUESTED, REQUEST_SUCCESS, REQUEST_FAIL,LOGOUT_REQUEST_SUCCESS,
  LOGOUT_REQUESTED,LOGOUT_REQUEST_FAIL,
  SAVE_FCM_TOKEN_REQUEST,
  SAVE_FCM_TOKEN_SUCCESS

} from './types';

export const loginRequest = (
  countryCode,
  mobileNumber,
  password,
  fcmToken,
  navigation,
) => ({
  type: LOGIN_REQUESTED,
  countryCode,
  mobileNumber,
  password,
  fcmToken,
  navigation,
});

export const loginSuccess = data => ({
  type: REQUEST_SUCCESS,
  data,
});
export const loginFail = () => ({
  type: REQUEST_FAIL,
});

export const logoutRequest = (navigation) => ({
  type: LOGOUT_REQUESTED,
  navigation,
});

export const logoutSuccess = data => ({
  type: LOGOUT_REQUEST_SUCCESS,
  data,
});
export const logoutFail = () => ({
  type: LOGOUT_REQUEST_FAIL,
});

//FCM ACTION
export const saveFcmTokenRequest = (fcmToken) => ({
  type: SAVE_FCM_TOKEN_REQUEST,
  fcmToken,
});

export const saveFcmTokenSuccess = data => ({
  type: SAVE_FCM_TOKEN_SUCCESS,
  data,
});