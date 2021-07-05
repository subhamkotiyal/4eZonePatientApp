import {takeEvery, put} from 'redux-saga/effects';
import {GET_FEVORITE_TRAINER_REQUEST} from './types';
import {getFevoriteTrainerSuccess, getFevoriteTrainerFail} from './actions';
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
    const responseTrainer = yield Request.get(Config.getAllFavouriteTrainer);
    if (responseTrainer.status === SUCCESS) {
      yield put(getFevoriteTrainerSuccess(responseTrainer.data));
      yield* hideLoader(false,'');
    } else {
      yield put(getFevoriteTrainerFail());
      yield* hideLoader(false, '')  
    }
  } catch (error) {
    yield* hideLoader(false,'');
    yield put(getFevoriteTrainerFail());
  }
}




function* sagaProfile() {
  yield takeEvery(GET_FEVORITE_TRAINER_REQUEST, getFevoriteRequested);
}
export default sagaProfile;
