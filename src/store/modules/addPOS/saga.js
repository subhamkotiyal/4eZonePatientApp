import {takeEvery, put} from 'redux-saga/effects';
import {ADDPOS_REQUEST} from './types';
import {posFail, posSuccess} from './actions';
import {
  showLoader,
  showToast,
  hideLoader,
} from '_utils/methods';
import Config, { SUCCESS } from '_utils/constants/apiConstant';
import { Request } from '_services'
import {PaymentMethodListSuccess} from '../getPaymentMethodList/actions';
function* onPOSRequested({
  customerId,
  name,
  token,
  lastd,
  navigation,
}) {
  yield* showLoader(false);
  try {
    let details = {
      customerId: customerId,
      type: 'Card',
      name: name,
      token: token,
      lastd: lastd,
      detials: 'Payment Details',
    };
    // console.log('data');
    const posData = yield Request.post(Config.userPOS,details);
    if (posData.status === SUCCESS) {
      const paymentMethodData = yield Request.get(Config.paymentMethodList);
      if (paymentMethodData.status === SUCCESS) {
        yield put(PaymentMethodListSuccess(paymentMethodData.data));
      }
      showToast('Card added successfully','success')
      yield put(posSuccess());
      yield* hideLoader(false, '');
      setTimeout(() => {
        navigation.goBack();
      }, 100);
    } else {
      yield* hideLoader(false, '');
      yield put(posFail());
      showToast(JSON.stringify(posData.message),'danger')
    }
  } catch (error) {
    // console.log(JSON.stringify(error));
    yield* hideLoader(false, '');
    yield put(posFail());
    showToast(error.message,'danger')
  }
}

function* sagaAddPOS() {
  yield takeEvery(ADDPOS_REQUEST, onPOSRequested);
}
export default sagaAddPOS;
