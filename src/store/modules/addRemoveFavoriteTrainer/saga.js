import {takeEvery, put} from 'redux-saga/effects';
import {ADD_FEVORITE_TRAINER_REQUEST,REMOVE_FEVORITE_TRAINER_REQUEST} from './types';
import {getFevoriteTrainerSuccess} from '../fevoriteTrainer/actions';
import {addFevoriteTrainerFail,
  removeFevoriteTrainerFail} from './actions';

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
    const response = yield Request.post(Config.addFavouriteTrainer,data);
    if (response.status === SUCCESS) {
      const fevoriteData = yield Request.get(Config.getAllFavouriteTrainer);
        if(fevoriteData.status === SUCCESS){
          yield put(getFevoriteTrainerSuccess(fevoriteData.data));
          showToast(response.message,'success')
        }
      yield* hideLoader(false, '');
    } else {
      yield put(addFevoriteTrainerFail());
      showToast(response.message,'danger')

      yield* hideLoader(false, '')  
    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(addFevoriteTrainerFail());
    showToast(error.message,'danger')

  }
}

function* removeFevoriteRequested({data}) {
  yield* showLoader(false);
  try {
    const response = yield Request.post(Config.removeFavouriteTrainer,data);
    if (response.status === SUCCESS) {
      const fevoriteData = yield Request.get(Config.getAllFavouriteTrainer);
      debugger
      if(fevoriteData.status === SUCCESS){
        yield put(getFevoriteTrainerSuccess(fevoriteData.data));
      }
      yield* hideLoader(false, '');
    } else {
      yield put(removeFevoriteTrainerFail());
      yield* hideLoader(false, '') 
      showToast(response.message,'danger')
 
    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(removeFevoriteTrainerFail());
    showToast(error.message,'danger')

  }
}


function* sagaProfile() {
  yield takeEvery(ADD_FEVORITE_TRAINER_REQUEST, addFevoriteRequested);
  yield takeEvery(REMOVE_FEVORITE_TRAINER_REQUEST, removeFevoriteRequested);

}
export default sagaProfile;
