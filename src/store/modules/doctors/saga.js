import AsyncStorage from '@react-native-community/async-storage';
import {takeEvery,select, put} from 'redux-saga/effects';

import {
  GET_NERBY_DOCTOR_REQUEST,
  GET_NERBY_DOCTOR_SUCCESS,
  GET_NERBY_DOCTOR_FAILURE,
  GET_TRAINER_SESSION_REQUEST
} from './types';
import {getNearbyDoctorSuccess, getNearbyDoctorFail} from './actions';

import {
  showLoader,
  showToast,
  hideLoader,
} from '_utils/methods';
import Config, { SUCCESS } from '_utils/constants/apiConstant';
import { Request } from '_services'

function* onNearbyDoctorRequested({data,cb}) {


  yield* showLoader(false);
  try {
    const doctorData = yield Request.post(Config.doctorNearby,data);
    if (doctorData.status === SUCCESS) {
      //set data in redux pagination
      const getDoctors = (state) => state.nearByDoctorReducer.nearbyDoctors
      const doctors = yield select(getDoctors)
      console.log(doctorData.data,"doctorData.data",data)
      if(data.page == 0){
        yield put(getNearbyDoctorSuccess(doctorData.data));
      }else{
        debugger
        yield put(getNearbyDoctorSuccess(doctorData.data));

        // yield put(getNearbyDoctorSuccess({
        //   data:[...doctors.data,...doctorData.data.data],
        //   count:doctorData.data.count
        // }));
      }
      yield* hideLoader(false, '');
      //return cb(doctorData.data)

    } else {
      yield put(getNearbyDoctorFail());
      yield* hideLoader(false, '');
      showToast(doctorData.message,'danger')
    }
  } catch (error) {
    yield put(getNearbyDoctorFail());
    yield* hideLoader(false, '');
    showToast(error.message,'danger')


  }
}


function* sagaNearByDoctor() {
  yield takeEvery(GET_NERBY_DOCTOR_REQUEST, onNearbyDoctorRequested);
}
export default sagaNearByDoctor;
