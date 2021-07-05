import Axios from 'axios';
import {AsyncStorage} from 'react-native';
import {takeEvery, put, call} from 'redux-saga/effects';
import {REGISTER} from './types';
import {registerFail, registerSuccess} from './actions';
import {
  showLoader,
  showToast,
  hideLoader,
} from '_utils/methods';

import Config, { SUCCESS } from '_utils/constants/apiConstant';
import { Request } from '_services'

import {NavigationActions, StackActions} from  '@react-navigation/native';
import {loginSuccess} from '../password/actions';
// import {PaymentMethodListSuccess} from '../GetPaymentMethodList/actions';
import {profileSuccess} from '../getProfile/actions';
import {WSService, Configuration} from '_utils';
import SocketIOClient from 'socket.io-client';
import config from '../../../config';
const connectSocket = (user,fcmToken)=>{
  if (user) {
    let socket
    let data = {};
    data['customerId'] = user._id;
    data['firebase_token'] = fcmToken;
    socket = SocketIOClient(config.BASE_URL, {
      transports: ['polling'],
    });
    socket.on('connect', () => {
      socket.emit(`customersocket`, data, data => {});
    });
    Configuration.setConfiguration('Socket', socket);
  }
}
function* onRegisterRequested({data, navigation}) {
  yield* showLoader(false);
  try {
    const response = yield Request.post(
      Config.register,
      data
    );
    debugger
    if (response.status == SUCCESS) {
      yield put(loginSuccess(response.data));
      yield put(profileSuccess(response.data));
      yield put(registerSuccess(response.data));
      yield* hideLoader(false, '');
      connectSocket(response.data,data.fcmToken)

      navigation.navigate('App')
      
      // const resetAction = StackActions.reset({
      //   index: 0,
      //   actions: [NavigationActions.navigate({routeName: 'App'})],
      // });
      // navigation.dispatch(resetAction);
    } else {
      yield* hideLoader(false, '');
      yield put(registerFail());
      showToast(response.message,'danger')
    }
  } catch (error) {
    //console.log(JSON.stringify(error));
    yield* hideLoader(false, '');
    showToast(error.message,'danger')
    yield put(registerFail());
  }
}

function* sagaRegister() {
  yield takeEvery(REGISTER, onRegisterRequested);
}
export default sagaRegister;
