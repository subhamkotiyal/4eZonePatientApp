import {
  GET_NERBY_TRAINER_REQUEST,
  GET_NERBY_TRAINER_SUCCESS,
  GET_NERBY_TRAINER_FAILURE,
} from './types';

const INITIAL_STATE = {
  nearbyTrainers: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_NERBY_TRAINER_REQUEST:
      return {
        ...state,
      };
    case GET_NERBY_TRAINER_SUCCESS:
      return {
        ...state,
        nearbyTrainers: action.data,
      };
    case GET_NERBY_TRAINER_FAILURE:
      return {
        ...state,
      };
    default:
      return state;
  }
};
