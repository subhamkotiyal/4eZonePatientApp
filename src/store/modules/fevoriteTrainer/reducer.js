import {
  GET_FEVORITE_TRAINER_SUCCESS,
  GET_FEVORITE_TRAINER_REQUEST,
  GET_FEVORITE_TRAINER_FAILURE,
} from './types';;

const INITIAL_STATE = {
  fevoriteTrainer: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_FEVORITE_TRAINER_REQUEST:
      return {
        ...state,
      };
    case GET_FEVORITE_TRAINER_SUCCESS:
      return {
        ...state,
        fevoriteTrainer: action.data,
      };
    case GET_FEVORITE_TRAINER_FAILURE:
      return {
        ...state,
      };
    default:
      return state;
  }
};
