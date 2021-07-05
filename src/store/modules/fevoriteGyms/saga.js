import {takeEvery, put} from 'redux-saga/effects';
import {GET_FEVORITE_GYMS_REQUEST} from './types';
import {getFevoriteSuccess, getFevoriteFail} from './actions';
import {
  showLoader,
  showToast,
  hideLoader,
} from '_utils/methods';
import Config, { SUCCESS } from '_utils/constants/apiConstant';
import { Request } from '_services'

function* getFevoriteRequested() {
  yield* showLoader(false);
  try {
    const response = yield Request.get(Config.getAllFavourite);
    if (response.status === SUCCESS) {
      yield put(getFevoriteSuccess(response.data));
      yield* hideLoader(false, '');
    } else {
      yield put(getFevoriteFail());
      yield* hideLoader(false, '')  
    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(getFevoriteFail());
  }
}

function* sagaProfile() {
  yield takeEvery(GET_FEVORITE_GYMS_REQUEST, getFevoriteRequested);
}
export default sagaProfile;
