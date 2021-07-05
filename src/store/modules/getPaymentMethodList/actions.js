import {
  PAYMENTLIST_SUCCESS,
  PAYMENTLIST_REQUEST,
  PAYMENTLIST_FAILURE,
} from './types';

export const paymentMethodListRequest = navigation => ({
  type: PAYMENTLIST_REQUEST,
  navigation,
});

// export const PaymentMethodListRequest = () => dispatch => {
//   dispatch({type: LOAD_USERS_LOADING});
// };

export const PaymentMethodListSuccess = data => ({
  type: PAYMENTLIST_SUCCESS,
  data,
});
export const PaymentMethodListFail = () => ({
  type: PAYMENTLIST_FAILURE,
});
