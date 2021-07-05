import {PROMO_LIST_REQUEST, PROMO_LIST_SUCCESS, PROMO_FAILURE} from './types';

export const promoListRequest = () => ({
  type: PROMO_LIST_REQUEST,
});

export const promoListSuccess = data => ({
  type: PROMO_LIST_SUCCESS,
  data,
});
export const promoFail = () => ({
  type: PROMO_FAILURE,
});
