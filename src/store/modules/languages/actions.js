import * as types from './types'

// eslint-disable-next-line import/prefer-default-export
export const switchlanguageData = payload => ({
    type: types.SWITCH_LANGUAGE_DATA,
    payload
  });
  
export const languageFail = () => ({
    type: types.LANGUAGE_FAIL,
  });