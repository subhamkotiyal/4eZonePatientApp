import {
  ADD_FEVORITE_GYMS_SUCCESS,
  ADD_FEVORITE_GYMS_REQUEST,
 ADD_FEVORITE_GYMS_FAILURE,
} from './types';

import {
  REMOVE_FEVORITE_GYMS_SUCCESS,
  REMOVE_FEVORITE_GYMS_REQUEST,
 REMOVE_FEVORITE_GYMS_FAILURE,
} from './types';

export const addFevoriteRequest = data => ({
  type: ADD_FEVORITE_GYMS_REQUEST,
  data,
});

export const addFevoriteSuccess = (data,api) => ({
  type: ADD_FEVORITE_GYMS_SUCCESS,
  data,
  api
});

export const addFevoriteFail = () => ({
  type: ADD_FEVORITE_GYMS_FAILURE,
});


export const removeFevoriteRequest = data => ({
  type: REMOVE_FEVORITE_GYMS_REQUEST,
  data,
});

export const removeFevoriteSuccess = data => ({
  type: REMOVE_FEVORITE_GYMS_SUCCESS,
  data,
});

export const removeFevoriteFail = () => ({
  type: REMOVE_FEVORITE_GYMS_FAILURE,
});
