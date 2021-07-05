import {takeEvery, put} from 'redux-saga/effects';
import {
  GET_SPECIALLIST_REQUEST,
  
} from './types';
import {
  getAllSpecialistFail, getAllSpecialistSuccess,
} from './actions';
import {
  showLoader,
  showToast,
  hideLoader,
} from '_utils/methods';
import Config, { SUCCESS } from '_utils/constants/apiConstant';
import { Request } from '_services'

function* onGetSpecialListRequested({data}) {
  yield* showLoader(false);
  try {
    const gymData = yield Request.get(Config.getAllSpecialist);
    debugger
    if (gymData.status === SUCCESS) {
      yield put(getAllSpecialistSuccess(gymData.data));
      yield* hideLoader(false, '');
      
    } else {
      showToast(gymData.message,'danger')
      yield put(getAllSpecialistFail());
      yield* hideLoader(false, '');
      
    }
  } catch (error) {
    showToast(error.message,'danger')
    yield put(getAllSpecialistFail());
    yield* hideLoader(false, '');

  }
}


function* sagaGetSpecialList() {
  yield takeEvery(GET_SPECIALLIST_REQUEST, onGetSpecialListRequested);

}
export default sagaGetSpecialList;
