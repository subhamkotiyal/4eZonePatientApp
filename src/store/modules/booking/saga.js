import { takeEvery, put } from 'redux-saga/effects';
import {
  ADD_BOOING_REQUEST,
  GET_BOOKING_REQUEST
} from './types';
import { CommonActions } from '@react-navigation/native';

import {
  addBookingFail,
  addBookingSuccess,
  getPastBookingFail,
  getPastBookingSuccess,
  getUpcomingBookingFail,
  getUpcomingBookingSuccess,

} from './actions';
import {
  showLoader,
  showToast,
  hideLoader,
} from '_utils/methods';
import Config, { SUCCESS } from '_utils/constants/apiConstant';
import { Request } from '_services'

// Add  booking
function* addBookingRequest({ apiName, data, navigation }) {
  debugger
  yield* showLoader(false);
  try {
    const response = yield Request.post(apiName, data);
    debugger
    console.log(response,"response")
    if (response.status === SUCCESS) {
      yield put(addBookingSuccess(response.data));
      yield* hideLoader(false, '');
      navigation.navigate('ThankyouSuccess')
      showToast('Booking request created successfully', 'success')

    } else {
      yield put(addBookingFail());
      yield* hideLoader(false, '')
      showToast(response.message, 'danger')
    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(addBookingFail());
    showToast(error.message, 'danger')

  }
}

// Get all booking
function* getBookingRequest(data) {
  yield* showLoader(false);
  try {
    debugger
    const response = yield Request.get(Config.getBooking);
    debugger
    if (response.status === SUCCESS) {
      yield put(getPastBookingSuccess(response.data.past));
      yield put(getUpcomingBookingSuccess(response.data.upcoming));
      yield* hideLoader(false, '');
    } else {
      yield put(getPastBookingFail());
      yield put(getUpcomingBookingFail());
      showToast(response.message, 'danger')
      yield* hideLoader(false, '')
    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(getPastBookingFail());
    yield put(getUpcomingBookingFail());

    showToast(error.message, 'danger')

  }
}







function* sagaBooking() {
  yield takeEvery(ADD_BOOING_REQUEST, addBookingRequest);
  yield takeEvery(GET_BOOKING_REQUEST, getBookingRequest)

}
export default sagaBooking;
