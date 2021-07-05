import Axios from 'axios';
import {takeEvery, put} from 'redux-saga/effects';
import {
  LOGIN_REQUESTED,
  LOGOUT_REQUESTED,
  SAVE_FCM_TOKEN_REQUEST,
} from './types';
import {
  loginFail,
  logoutFail,
  saveFcmTokenSuccess,
  loginSuccess,
  logoutSuccess,
} from './actions';
import {showLoader, showToast, hideLoader} from '_utils/methods';
import {WSService, Configuration} from '_utils';
import SocketIOClient from 'socket.io-client';
import config from '../../../config';

import Config, {SUCCESS} from '_utils/constants/apiConstant';
import {Request} from '_services';

import {NavigationActions, StackActions} from '@react-navigation/native';
import {profileSuccess} from '../getProfile/actions';
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
      console.log('connect')
      socket.emit(`customersocket`, data, data => {
        console.log('customersocket')

      });
    });
    Configuration.setConfiguration('Socket', socket);
  }
}
function* onLoginRequested({
  countryCode,
  mobileNumber,
  password,
  fcmToken,
  navigation,
}) {
  debugger;
  yield* showLoader(false);
  try {
    let data = {
      //countryCode: countryCode,
      mobileNumber: mobileNumber,
      password: password,
      firebaseToken: fcmToken ? fcmToken :'No Token',
    };
    const loginData = yield Request.post(Config.loginMobile, data);
    debugger;
    console.log('data:   ' + JSON.stringify(loginData));
    if (loginData.status === SUCCESS) {
      connectSocket(loginData.data,fcmToken)
      yield put(profileSuccess(loginData.data));
      yield put(loginSuccess(loginData.data));
      yield* hideLoader(false, '');
      navigation.navigate('App');
    } else {
      yield put(loginFail());
      yield* hideLoader(false, '');
      // eslint-disable-next-line no-undef
      yield showToast(loginData.message, 'danger');
    }
  } catch (error) {
    var aa = error;
    yield put(loginFail());
    yield* hideLoader(false, '');
    showToast(error.message,'danger');
  }
}
function* onLogoutRequested({navigation}) {
  yield* showLoader(false);
  try {
    yield put(profileSuccess(null));
    yield put(loginSuccess(null));
    yield put(logoutSuccess(null));
    yield* hideLoader(false, '');
    if(navigation){
      navigation.navigate('Auth', {
        screen: 'Login',
      })
    }
  } catch (error) {
    yield put(logoutFail());
    yield* hideLoader(false, '');
    showToast(error.message,'danger');

  }
}
function* onSaveFcmTokenRequest({fcmToken}) {
  try {
    yield put(saveFcmTokenSuccess(fcmToken));
  } catch (error) {
    console.error(error, 'eroroor');
  }
}

function* sagaLogin() {
  yield takeEvery(LOGIN_REQUESTED, onLoginRequested);
  yield takeEvery(LOGOUT_REQUESTED, onLogoutRequested);
  yield takeEvery(SAVE_FCM_TOKEN_REQUEST, onSaveFcmTokenRequest);
}
export default sagaLogin;
