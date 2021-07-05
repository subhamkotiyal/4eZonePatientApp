import Axios from 'axios';
import {AsyncStorage, Alert} from 'react-native';
import {takeEvery, put} from 'redux-saga/effects';
import {SUPPORT_REQUEST} from './types';
import {supportSuccess, supportFail} from './actions';
import {
  showLoader,
  showToast,
  hideLoader,
} from '_utils/methods';
import Config, { SUCCESS } from '_utils/constants/apiConstant';
import { Request } from '_services'
function* onSupportRequest({data, navigation}) {
  yield* showLoader(false);
  try {
    const responseData = yield Request.post(
      Config.supportEmailURL,
      data,
    );
    if (responseData.status === SUCCESS) {
      yield put(supportSuccess(responseData.data));
      yield* hideLoader(false, '');
      showToast(responseData.message,'success')
      navigation.goBack();
    } else {
      yield* hideLoader(false, '');
      yield put(supportFail());
      showToast(responseData.message ? responseData.message : 'Failed', 'danger')
    }
  } catch (error) {
    // console.log(JSON.stringify(error));
    yield* hideLoader(false, '');
    yield put(supportFail());
    showToast(error.message ,'danger')

    //yield showAlertWithDelay('Invalid  details');
  }
}

function* sagaSupport() {
  yield takeEvery(SUPPORT_REQUEST, onSupportRequest);
}
export default sagaSupport;
