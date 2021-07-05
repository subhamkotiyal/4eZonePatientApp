import Axios from 'axios';
import {takeEvery, put} from 'redux-saga/effects';
import {REQUEST_RESET, CLEAR_OTP_REQUEST} from './types';
import {resetSuccess, clearOTPSuccess,resetFail} from './actions';
import {
  showLoader,
  showToast,
  hideLoader,
} from '_utils/methods';
import { Request } from '_services'

import Config, { SUCCESS } from '_utils/constants/apiConstant';

function* onResetRequested({countryCode, mobileNumber}) {
  yield* showLoader(false);
  try {
    let data = {
      countryCode: countryCode,
      mobileNumber: mobileNumber,
    };
    const response = yield Request.post(
      Config.resendotp,
      data
    );
    debugger
    if (response.status === SUCCESS) {
      showToast('OTP sent successfully','success')
      yield put(resetSuccess(response.data));
      yield* hideLoader(false, '');
    } else {
      showToast(response.message,'danger')
      yield* hideLoader(false, '');
      yield put(resetFail());
    }
  } catch (error) {
    showToast(error.message,'danger')
    yield* hideLoader(false, '');
    yield put(resetFail());
  }
}
function* onClearOTPRequested() {
  yield* showLoader(false);
  try {
    yield* hideLoader(false, '');
    yield put(clearOTPSuccess());
  } catch (error) {
    yield* hideLoader(false, '');
    showToast(error.message,'danger')
    yield put(clearOTPSuccess());
  }
}


function* sagaVerifyOtp() {
  yield takeEvery(REQUEST_RESET, onResetRequested);
  yield takeEvery(CLEAR_OTP_REQUEST, onClearOTPRequested);

}
export default sagaVerifyOtp;
