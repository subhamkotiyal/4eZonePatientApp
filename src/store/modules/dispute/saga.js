import { takeEvery, put } from 'redux-saga/effects';
import {
  SEND_TO_DISPUTE_REQUEST,GET_DISPUTE_REQUEST,
  GET_BOOKING_REQUEST, UPDATE_DIPUTE_REQUEST,
  RATING_REQUEST
} from './types';
import { CommonActions } from '@react-navigation/native';
import {
  getPastBookingSuccess,
  getUpcomingBookingSuccess,

} from '../booking/actions';
import {
  sendDisputeSuccess,
  sendDisputeFail,
  getCompletedDisputeFail,
  getCompletedDisputeSuccess,
  getInProcessDisputeFail,
  getInProcessDisputeSuccess,
  ratingSuccess,
  ratingFail,
  getDisputeRequest,
} from './actions';
import {
  showLoader,
  showToast,
  hideLoader,
} from '_utils/methods';
import Config, { SUCCESS } from '_utils/constants/apiConstant';
import { Request } from '_services'

// Get all booking
function* getDiputesRequest() {
  yield* showLoader(false);
  try {
    const responseComp = yield Request.get(Config.getCompletedDispute);
    debugger
    const responseInProcess = yield Request.get(Config.getInProcessDispute);
    if (responseComp.status === SUCCESS) {
      yield put(getCompletedDisputeSuccess(responseComp.data));
      yield* hideLoader(false, '');
    } else {
      yield put(getCompletedDisputeFail());
      yield* hideLoader(false, '')
    }
    if (responseInProcess.status === SUCCESS) {
      yield put(getInProcessDisputeSuccess(responseInProcess.data));
      yield* hideLoader(false, '');
    } else {
      yield put(getInProcessDisputeFail());
      yield* hideLoader(false, '')
    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(getCompletedDisputeFail());
    yield put(getInProcessDisputeFail());
    showToast(error.message, 'danger')

  }
}

// Send to dispute
function* sendToDisputeRequest({ apiName,data, navigation }) {
  yield* showLoader(false);
  try {
    const response = yield Request.post(apiName,data);
    if (response.status === SUCCESS) {
      yield put(sendDisputeSuccess(response.data));
      yield put(getDisputeRequest())
      yield* hideLoader(false, '');
      navigation.popToTop()

    } else {
      yield put(sendDisputeFail());
      navigation.popToTop()

      yield* hideLoader(false, '')
    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(sendDisputeFail());
    showToast(error.message, 'danger')

  }
}
// Send to dispute
function* updateDisputeRequest({ apiName,data, navigation }) {
  yield* showLoader(false);
  try {
    const response = yield Request.post(apiName,data);
    if (response.status === SUCCESS) {
      yield* hideLoader(false, '');
      navigation.popToTop()
    } else {
      yield put(sendDisputeFail());
      yield* hideLoader(false, '')
    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(sendDisputeFail());
    showToast(error.message, 'danger')

  }
}

// Rating Request
function* ratingRequestSubmit({apiName, data, navigation}) {
  debugger
  yield* showLoader(false);
  try {
    const response = yield Request.post(apiName, data);
    if (response.status === SUCCESS) {
      const responseBooking = yield Request.get(Config.getBooking);
      if(responseBooking.status == SUCCESS){
        yield put(getPastBookingSuccess(responseBooking.data.past));
        yield put(getUpcomingBookingSuccess(responseBooking.data.upcoming));
      }
      yield put(ratingSuccess(response.data));
      yield* hideLoader(false, '');
      navigation.popToTop()
    } else {
      yield put(ratingFail());
      navigation.popToTop()
      yield* hideLoader(false, '')
    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(ratingFail());
    showToast(error.message, 'danger')

  }
}


function* sagaDispute() {
  yield takeEvery(GET_DISPUTE_REQUEST, getDiputesRequest)
  yield takeEvery(SEND_TO_DISPUTE_REQUEST, sendToDisputeRequest)
  yield takeEvery(RATING_REQUEST, ratingRequestSubmit)
  yield takeEvery(UPDATE_DIPUTE_REQUEST,updateDisputeRequest)

}
export default sagaDispute;
