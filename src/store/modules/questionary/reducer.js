import {
  GET_QUESTIONARY_REQUEST,
  GET_QUESTIONARY_SUCCESS,
  GET_QUESTIONARY_FAILURE,
} from './types';

const INITIAL_STATE = {
  questionary: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_QUESTIONARY_REQUEST:
      return {
        ...state,
        questionary:[]

      };
    case GET_QUESTIONARY_SUCCESS:
      return {
        ...state,
        questionary: action.data,
      };
    case GET_QUESTIONARY_FAILURE:
      return {
        ...state,
        questionary:[]
      };
    default:
      return state;
  }
};
