import AsyncStorage from '@react-native-community/async-storage';
import {takeEvery, put} from 'redux-saga/effects';
import {
  GET_NERBY_TRAINER_REQUEST,
  GET_NERBY_TRAINER_SUCCESS,
  GET_NERBY_TRAINER_FAILURE,
  GET_TRAINER_SESSION_REQUEST
} from './types';
import {getNearbyTrainerSuccess, getNearbyTrainerFail} from './actions';
// import {
//   getGymSessionListSuccess,
//   getGymSessionFail
// } from '../gyms/actions';
import {
  showLoader,
  showToast,
  hideLoader,
} from '_utils/methods';
import Config, { SUCCESS } from '_utils/constants/apiConstant';
import { Request } from '_services'

function* onNearbyTrainerRequested({data}) {
  yield* showLoader(false);
  try {
    const trainerData = yield Request.post(Config.nearbyTrainer,data);
    debugger
    if (trainerData.status === SUCCESS) {
      yield put(getNearbyTrainerSuccess(trainerData.data));
      yield* hideLoader(false, '');
      
    } else {
      yield put(getNearbyTrainerFail());
      yield* hideLoader(false, '');
      showToast(trainerData.message,'danger');

    }
  } catch (error) {
    yield put(getNearbyTrainerFail());
    yield* hideLoader(false, '');
    showToast(error.message,'danger');

  }
}

function* onTrainerSessionRequest({data}) {
  yield* showLoader(false);
  try {
    const gymTrainers = yield Request.get(`${Config.getTrainerSession}/${data.gymId}`);
    debugger
    if (gymTrainers.status === SUCCESS) {
      debugger
      yield put(getGymSessionListSuccess(gymTrainers.data));
      yield* hideLoader(false, '');
    }else {
      yield put(getGymSessionFail());
      yield* hideLoader(false, '');
      showToast(gymTrainers.message,'danger');

    }
   
  } catch (error) {
    yield put(getGymSessionFail());
    yield* hideLoader(false, '');
    showToast(error.message,'danger');

  }
}

function* sagaNearByTrainer() {
  yield takeEvery(GET_TRAINER_SESSION_REQUEST, onTrainerSessionRequest);
  yield takeEvery(GET_NERBY_TRAINER_REQUEST, onNearbyTrainerRequested);
}
export default sagaNearByTrainer;
