import {
  ADD_BOOING_SUCCESS,
  ADD_BOOING_REQUEST,
  ADD_BOOING_FAILURE,
  GET_PAST_BOOKING_SUCCESS,
  GET_PAST_BOOKING_FAILURE,
  GET_UPCOMING_BOOKING_SUCCESS,
  GET_UPCOMING_BOOKING_FAILURE,
  GET_BOOKING_REQUEST
} from './types';

const INITIAL_STATE = {
  pastBooking: [],
  upcomingBooking: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_BOOKING_REQUEST:
      return {
        ...state,
      };
    case GET_PAST_BOOKING_SUCCESS:
      return {
        ...state,
        pastBooking: action.data,
      };
    case GET_PAST_BOOKING_FAILURE:
      return {
        ...state,
      };
    case GET_UPCOMING_BOOKING_SUCCESS:
      return {
        ...state,
        upcomingBooking: action.data,
      };
    case GET_UPCOMING_BOOKING_FAILURE:
      return {
        ...state,
      };
    case ADD_BOOING_REQUEST:
      return {
        ...state,
      };
    case ADD_BOOING_SUCCESS:
      return {
        ...state,
      };
    case ADD_BOOING_FAILURE:
      return {
        ...state,
      };
    default:
      return state;
  }
};
