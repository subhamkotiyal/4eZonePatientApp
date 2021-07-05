import {takeEvery, put} from 'redux-saga/effects';
import {ADD_FEVORITE_GYMS_REQUEST,REMOVE_FEVORITE_GYMS_REQUEST} from './types';
import {getFevoriteSuccess, getFevoriteFail} from '../fevoriteGyms/actions';
import {addFevoriteSuccess, addFevoriteFail,
  removeFevoriteSuccess,
  removeFevoriteFail} from './actions';

import {
  showLoader,
  showToast,
  hideLoader,
} from '_utils/methods';
import Config, { SUCCESS } from '_utils/constants/apiConstant';
import { Request } from '_services'

function* addFevoriteRequested({data}) {
  yield* showLoader(false);
  try {
    const response = yield Request.post(Config.addFevoriteGym,data);
    if (response.status === SUCCESS) {
      const fevoriteData = yield Request.get(Config.getAllFavourite);
        if(fevoriteData.status === SUCCESS){
          yield put(getFevoriteSuccess(fevoriteData.data));
          showToast('Added successfully','success')

        }
      yield* hideLoader(false, '');
    } else {
      yield put(addFevoriteFail());
      yield* hideLoader(false, '')  
      showToast(response.message,'danger')

    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(addFevoriteFail());
  }
}

function* removeFevoriteRequested({data}) {
  yield* showLoader(false);
  try {
    const response = yield Request.post(Config.removeFevoriteGym,data);
    if (response.status === SUCCESS) {
      const fevoriteData = yield Request.get(Config.getAllFavourite);
      if(fevoriteData.status === SUCCESS){
        yield put(getFevoriteSuccess(fevoriteData.data));
      }
      yield* hideLoader(false, '');
    } else {
      yield put(removeFevoriteFail());
      yield* hideLoader(false, '')  
    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(removeFevoriteFail());
  }
}


function* sagaProfile() {
  yield takeEvery(ADD_FEVORITE_GYMS_REQUEST, addFevoriteRequested);
  yield takeEvery(REMOVE_FEVORITE_GYMS_REQUEST, removeFevoriteRequested);

}
export default sagaProfile;
