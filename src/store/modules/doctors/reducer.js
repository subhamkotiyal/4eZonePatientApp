import {
  GET_NERBY_DOCTOR_REQUEST,
  GET_NERBY_DOCTOR_SUCCESS,
  GET_NERBY_DOCTOR_FAILURE,
} from './types';

const INITIAL_STATE = {
  nearbyDoctors: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_NERBY_DOCTOR_REQUEST:
      return {
        ...state,
      };
    case GET_NERBY_DOCTOR_SUCCESS:
      debugger
      return {
        ...state,
        nearbyDoctors: action.data,
      };
    case GET_NERBY_DOCTOR_FAILURE:
      return {
        ...state,
        nearbyDoctors:[]
      };
    default:
      return state;
  }
};
