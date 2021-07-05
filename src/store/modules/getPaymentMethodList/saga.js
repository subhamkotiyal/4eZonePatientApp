import {takeEvery, put} from 'redux-saga/effects';
import {PAYMENTLIST_REQUEST} from './types';
import {PaymentMethodListSuccess, PaymentMethodListFail} from './actions';
import {
  showLoader,
  showToast,
  hideLoader,
} from '_utils/methods';
import Config, { SUCCESS } from '_utils/constants/apiConstant';
import { Request } from '_services'

function* onPaymentMethodListRequested({navigation}) {
  yield* showLoader(false);
  try {
    const paymentMethodData = yield Request.get(Config.paymentMethodList);

    if (paymentMethodData.status === SUCCESS) {
      yield put(PaymentMethodListSuccess(paymentMethodData.data));
      yield* hideLoader(false, '');
    } else {
      yield put(PaymentMethodListFail());
      yield* hideLoader(false, '');
      showToast(JSON.stringify(paymentMethodData.message),'danger')
    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(PaymentMethodListFail());
    yield showToast(error.message,'danger');

  }
}

function* sagaPaymentMethodList() {
  yield takeEvery(PAYMENTLIST_REQUEST, onPaymentMethodListRequested);
}
export default sagaPaymentMethodList;
