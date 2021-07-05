import {ADDPOS_REQUEST, ADDPOS_SUCCESS, ADDPOS_FAILURE} from './types';

export const posRequest = (
  customerId,
  name,
  token,
  lastd,
  navigation,
) => ({
  type: ADDPOS_REQUEST,
  customerId,
  name,
  token,
  lastd,
  navigation,
});

export const posSuccess = data => ({
  type: ADDPOS_SUCCESS,
  data,
});
export const posFail = () => ({
  type: ADDPOS_FAILURE,
});
