import {takeEvery, put} from 'redux-saga/effects';
import {PROMO_LIST_REQUEST} from './types';
import {promoListSuccess, promoFail} from './actions';
import {
  showLoader,
  showToast,
  hideLoader,
} from '_utils/methods';
import Config, { SUCCESS } from '_utils/constants/apiConstant';
import { Request } from '_services'
function* onPromoListRequest() {
  yield* showLoader(false);
  try {
    const responseData = yield Request.get(Config.allPromosURL);
    if (responseData.status === SUCCESS) {
      yield put(promoListSuccess(responseData.data));
      yield* hideLoader(false, '');
    } else {
      yield* hideLoader(false, '');
      yield put(promoFail());
      showToast(responseData.message,'danger');
    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(promoFail());
    showToast(error.message,'danger');

  }
}

function* sagaPromoCodes() {
  yield takeEvery(PROMO_LIST_REQUEST, onPromoListRequest);
}
export default sagaPromoCodes;
