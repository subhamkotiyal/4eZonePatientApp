import {
  PAYMENTLIST_SUCCESS,
  PAYMENTLIST_REQUEST,
  PAYMENTLIST_FAILURE,
} from './types';

const INITIAL_STATE = {
  paymentMethodData: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PAYMENTLIST_REQUEST:
      return {
        ...state,
      };
    case PAYMENTLIST_SUCCESS:
      return {
        ...state,
        paymentMethodData: action.data,
      };
    case PAYMENTLIST_FAILURE:
      return {
        ...state,
      };
    default:
      return state;
  }
};
