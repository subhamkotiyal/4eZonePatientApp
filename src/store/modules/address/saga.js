import {takeEvery, put} from 'redux-saga/effects';
import {ADD_ADDRESS_REQUEST,
  GET_DEFAULT_ADDRESS_REQUEST,GET_ADDRESS_REQUEST} from './types';
import {addAddressFail, addAddressSuccess,
getAddressFail,getAddressSuccess,getDefaultAddressFail,
getDefaultAddressSuccess
} from './actions';
import {
  showLoader,
  showToast,
  hideLoader,
} from '_utils/methods';
import Config, { SUCCESS } from '_utils/constants/apiConstant';
import { Request } from '_services'


function* onGetDefaultAddressRequest({
  data,
  navigation
}) {
  yield* showLoader(false);
  try {
    const posData = yield Request.post(Config.addressdefault,data);
    if (posData.status === SUCCESS) {
      const getAdsData = yield Request.post(Config.getAddress);
        if(getAdsData.status === SUCCESS){
          yield put(getAddressSuccess(getAdsData.data));
          navigation.goBack()
        }
      yield* hideLoader(false, '');
    } else {
      yield* hideLoader(false, '');
      yield put(getDefaultAddressFail());
      showToast(posData.message,'danger')
    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(getDefaultAddressFail());
    showToast(error.message,'danger')
  }
}
function* onGetAddressRequest({
  data,
}) {
  yield* showLoader(false);
  try {
    const posData = yield Request.post(Config.getAddress);
    if (posData.status === SUCCESS) {
      yield put(getAddressSuccess(posData.data));
      yield* hideLoader(false, '');
    } else {
      yield* hideLoader(false, '');
      yield put(getAddressFail());
      showToast(posData.message,'danger')
    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(getAddressFail());
    showToast(error.message,'danger')
  }
}


function* onAddAddressRequest({
  data,
  navigation,
}) {
  yield* showLoader(false);
  try {
    const posData = yield Request.post(Config.addAddress,data);
    if (posData.status === SUCCESS) {
      const addressData = yield Request.post(Config.getAddress);
      if (addressData.status === SUCCESS) {
        const getAdsData = yield Request.post(Config.getAddress);
        if(getAdsData.status === SUCCESS){
          yield put(getAddressSuccess(addressData.data));
        }
      }
      yield put(addAddressSuccess());
      yield* hideLoader(false, '');
      setTimeout(() => {
        navigation.goBack();
      }, 600);
    } else {
      yield* hideLoader(false, '');
      yield put(addAddressFail());
      showToast(posData.message,'danger')
    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(addAddressFail());
    showToast(error.message,'danger')
  }
}

function* sagaAddress() {
  yield takeEvery(GET_DEFAULT_ADDRESS_REQUEST, onGetDefaultAddressRequest);
  yield takeEvery(GET_ADDRESS_REQUEST, onGetAddressRequest);
  yield takeEvery(ADD_ADDRESS_REQUEST, onAddAddressRequest);
}
export default sagaAddress;
