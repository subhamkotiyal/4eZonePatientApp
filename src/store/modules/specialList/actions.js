import {
  GET_SPECIALLIST_REQUEST,
  GET_SPECIALLIST_SUCCESS,
  GET_SPECIALLIST_FAILURE,
} from './types';

export const getAllSpecialistRequest= data => ({
  type: GET_SPECIALLIST_REQUEST,
  data,
});

export const getAllSpecialistSuccess = data => ({
  type: GET_SPECIALLIST_SUCCESS,
  data,
});
export const getAllSpecialistFail = () => ({
  type: GET_SPECIALLIST_FAILURE,
});

