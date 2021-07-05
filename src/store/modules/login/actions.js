import {
    MOBILE_SUCCESS,
    MOBILE_REQUESTED,
    LOGIN_WITH_SOCIAL_REQUEST,
    LOGIN_WITH_SOCIAL_SUCCESS,
    MOBILE_FAIL,
    BASIC_SETTING_FAIL,
    BASIC_SETTING_REQUEST,
    BASIC_SETTING_SUCCESS
  } from './types';

  
  export const loginRequest = (
    countryCode,
    mobileNumber,
    countryName,
    navigation,
  ) => ({
    type: MOBILE_REQUESTED,
    countryCode,
    mobileNumber,
    countryName,
    navigation,
  });
 
  
  export const loginWithSocialRequest = (data, navigation) => ({
    type: LOGIN_WITH_SOCIAL_REQUEST,
    data,
    navigation,
  });
  
  export const mobileSuccess = data => ({
    type: MOBILE_SUCCESS,
    data,
  });
  export const loginWithSocialSuccess = data => ({
    type: LOGIN_WITH_SOCIAL_SUCCESS,
    data,
  });
  export const mobileFail = () => ({
    type: MOBILE_FAIL,
  });
  
  export const basicSettingSuccess = data =>({
    type: BASIC_SETTING_SUCCESS,
    data
  })
  export const basicSettingFailed = data =>({
    type: BASIC_SETTING_FAIL,
    data
  })

  export const basicSettingRequest = (data)=>({
    type: BASIC_SETTING_REQUEST,
    data,
  })