import {takeEvery, put} from 'redux-saga/effects';
import {
  GET_QUESTIONARY_REQUEST,
  
} from './types';
import {
  getAllQuestionaryFail, getAllQuestionarySuccess,
} from './actions';
import {
  showLoader,
  showToast,
  hideLoader,
} from '_utils/methods';
import Config, { SUCCESS } from '_utils/constants/apiConstant';
import { Request } from '_services'

function* onGetQuestionaryRequested({data,callBackFxn}) {
  debugger
  yield* showLoader(false);
  try {
    const response = yield Request.post(Config.getAllQUestion,data);
    debugger
    if (response.status === SUCCESS) {
      yield put(getAllQuestionarySuccess(response.data));
      yield* hideLoader(false, '');
      return callBackFxn(response.data)
      
    } else {
      showToast(response.message,'danger')
      yield put(getAllQuestionaryFail());
      yield* hideLoader(false, '');
      
    }
  } catch (error) {
    showToast(error.message,'danger')
    yield put(getAllQuestionaryFail());
    yield* hideLoader(false, '');

  }
}


function* sagaGetQuestionary() {
  yield takeEvery(GET_QUESTIONARY_REQUEST, onGetQuestionaryRequested);

}
export default sagaGetQuestionary;
