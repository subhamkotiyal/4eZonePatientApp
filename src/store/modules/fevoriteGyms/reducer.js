import {
  GET_FEVORITE_GYMS_SUCCESS,
  GET_FEVORITE_GYMS_REQUEST,
  GET_FEVORITE_GYMS_FAILURE,
} from './types';;

const INITIAL_STATE = {
  fevoriteGyms: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_FEVORITE_GYMS_REQUEST:
      return {
        ...state,
      };
    case GET_FEVORITE_GYMS_SUCCESS:
      return {
        ...state,
        fevoriteGyms: action.data,
      };
    case GET_FEVORITE_GYMS_FAILURE:
      return {
        ...state,
      };
    default:
      return state;
  }
};
