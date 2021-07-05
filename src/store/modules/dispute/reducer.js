import {
  GET_INPROCESS_DISPUTE_SUCCESS,
  GET_INPROCESS_DISPUTE_FAILURE,
  GET_DISPUTE_REQUEST,
  GET_COMPLETED_DISPUTE_FAILURE,
  GET_COMPLETED_DISPUTE_SUCCESS,
} from './types';
const INITIAL_STATE = {
  inProcessDispute: [],
  completedDispute: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_DISPUTE_REQUEST:
      return {
        ...state,
      };
    case GET_COMPLETED_DISPUTE_SUCCESS:
      return {
        ...state,
        completedDispute: action.data,
      };
    case GET_COMPLETED_DISPUTE_FAILURE:
      return {
        ...state,
      };
    case GET_INPROCESS_DISPUTE_SUCCESS:
      return {
        ...state,
        inProcessDispute: action.data,
      };
    case GET_INPROCESS_DISPUTE_FAILURE:
      return {
        ...state,
      };
    default:
      return state;
  }
};
