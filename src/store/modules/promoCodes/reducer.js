import {PROMO_LIST_REQUEST, PROMO_LIST_SUCCESS, PROMO_FAILURE} from './types';

const INITIAL_STATE = {
  promoListData: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PROMO_LIST_REQUEST:
      return {
        ...state,
      };
    case PROMO_LIST_SUCCESS:
      return {
        ...state,
        promoListData: action.data,
      };
    case PROMO_FAILURE:
      return {
        ...state,
      };
    default:
      return state;
  }
};
