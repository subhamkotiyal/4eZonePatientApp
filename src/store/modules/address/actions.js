import { ADD_ADDRESS_REQUEST, ADD_ADDRESS_SUCCESS, 
  ADD_ADDRESS_FAILURE,
  GET_ADDRESS_FAILURE,
  GET_ADDRESS_REQUEST,
  GET_ADDRESS_SUCCESS,
  GET_DEFAULT_ADDRESS_SUCCESS,
  GET_DEFAULT_ADDRESS_REQUEST,
  GET_DEFAULT_ADDRESS_FAIL
} from './types';

export const addAddressRequest = (
  data,
  navigation,
) => ({
  type: ADD_ADDRESS_REQUEST,
  data,
  navigation,
});

export const addAddressSuccess = data => ({
  type: ADD_ADDRESS_SUCCESS,
  data,
});
export const addAddressFail = () => ({
  type: ADD_ADDRESS_FAILURE,
});


export const getAddressRequest = (
  data,
) => ({
  type: GET_ADDRESS_REQUEST,
  data,
});

export const getAddressSuccess = data => ({
  type: GET_ADDRESS_SUCCESS,
  data,
});
export const getAddressFail = () => ({
  type: GET_ADDRESS_FAILURE,
});


export const getDefaultAddressRequest = (
  data,
  navigation
) => ({
  type: GET_DEFAULT_ADDRESS_REQUEST,
  data,
  navigation
});
export const getDefaultAddressSuccess = (
  data,
) => ({
  type: GET_DEFAULT_ADDRESS_SUCCESS,
  data,
});

export const getDefaultAddressFail = (
  data,
) => ({
  type: GET_DEFAULT_ADDRESS_FAIL,
  data,
});
