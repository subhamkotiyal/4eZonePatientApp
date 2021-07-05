import {
  ADD_ADDRESS_SUCCESS,
  ADD_ADDRESS_REQUEST,
  ADD_ADDRESS_FAILURE,
  GET_ADDRESS_SUCCESS,
  GET_ADDRESS_REQUEST,
  GET_ADDRESS_FAILURE,
  GET_DEFAULT_ADDRESS_SUCCESS
} from './types';

const INITIAL_STATE = {
  addresses: [],
  defaultAddress:null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_ADDRESS_REQUEST:
      return {
        ...state,
      };
    case ADD_ADDRESS_SUCCESS:
      return {
        ...state,
      };
    case ADD_ADDRESS_FAILURE:
      return {
        ...state,
      };
    case GET_ADDRESS_REQUEST:
      return {
        ...state,
      };
    case GET_ADDRESS_SUCCESS:
      return {
        ...state,
        addresses: action.data,
      };
  case GET_DEFAULT_ADDRESS_SUCCESS:
        return {
          ...state,
          defaultAddress: action.data,
    };
    case GET_ADDRESS_FAILURE:
      return {
        ...state,
      };
    default:
      return state;
  }
};
