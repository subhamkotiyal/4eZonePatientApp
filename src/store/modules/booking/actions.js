import {
  ADD_BOOING_SUCCESS,
  ADD_BOOING_REQUEST,
  ADD_BOOING_FAILURE,
  GET_PAST_BOOKING_SUCCESS,
  GET_PAST_BOOKING_FAILURE,
  GET_UPCOMING_BOOKING_SUCCESS,
  GET_BOOKING_REQUEST,
  GET_UPCOMING_BOOKING_FAILURE,

} from './types';

//Get  Booking actions
export const getBookingRequest = () => ({
  type: GET_BOOKING_REQUEST,
});

export const getPastBookingSuccess = data => ({
  type: GET_PAST_BOOKING_SUCCESS,
  data,
});

export const getPastBookingFail = () => ({
  type: GET_PAST_BOOKING_FAILURE,
});


//Get Upcoming Booking actions
export const getUpcomingBookingSuccess = data => ({
  type: GET_UPCOMING_BOOKING_SUCCESS,
  data,
});

export const getUpcomingBookingFail = () => ({
  type: GET_UPCOMING_BOOKING_FAILURE,
});


//Add Booking actions
export const addBookingRequest = (apiName, data, navigation) => ({
  type: ADD_BOOING_REQUEST,
  apiName,
  data,
  navigation
});

export const addBookingSuccess = data => ({
  type: ADD_BOOING_SUCCESS,
  data,
});

export const addBookingFail = () => ({
  type: ADD_BOOING_FAILURE,
});


