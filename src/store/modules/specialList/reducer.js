import {
  GET_SPECIALLIST_REQUEST,
  GET_SPECIALLIST_SUCCESS,
  GET_SPECIALLIST_FAILURE,
} from './types';

const INITIAL_STATE = {
  specialList: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_SPECIALLIST_REQUEST:
      return {
        ...state,
      };
    case GET_SPECIALLIST_SUCCESS:
      return {
        ...state,
        specialList: action.data,
      };
    case GET_SPECIALLIST_FAILURE:
      return {
        ...state,
      };
    default:
      return state;
  }
};
