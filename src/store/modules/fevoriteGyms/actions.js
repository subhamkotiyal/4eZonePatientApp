import {
  GET_FEVORITE_GYMS_SUCCESS,
  GET_FEVORITE_GYMS_REQUEST,
  GET_FEVORITE_GYMS_FAILURE,
} from './types';

export const getFevoriteRequest = () => ({
  type: GET_FEVORITE_GYMS_REQUEST,
});

export const getFevoriteSuccess = data => ({
  type: GET_FEVORITE_GYMS_SUCCESS,
  data,
});

export const getFevoriteFail = () => ({
  type: GET_FEVORITE_GYMS_FAILURE,
});
