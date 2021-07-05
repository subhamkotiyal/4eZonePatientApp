import Axios from 'axios';
import { AsyncStorage } from 'react-native';
import { takeEvery, put } from 'redux-saga/effects';
import { MOBILE_REQUESTED, LOGIN_WITH_SOCIAL_REQUEST, BASIC_SETTING_REQUEST } from './types';
import { mobileFail, mobileSuccess, loginWithSocialSuccess, basicSettingSuccess, basicSettingFailed } from './actions';
import {
  showLoader,
  showToast,
  hideLoader,
} from '_utils/methods';
import Config, { SUCCESS } from '_utils/constants/apiConstant';
import { profileSuccess } from '../getProfile/actions';
import { loginSuccess } from '../password/actions';
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
import { Request } from '_services'
function* onMobileRequest({
  countryCode,
  mobileNumber,
  countryName,
  navigation,
}) {
  debugger
  yield* showLoader(false);
  try {
    let data = {
      countryCode: countryCode,
      mobileNumber: mobileNumber,
    };
    const response = yield Request.post(
      Config.verfiyMobile,
      data
    );
    if(response.status == SUCCESS){
      if (
        response.exist === true &&
        response.passwordStatus == true
      ) {
        yield put(mobileSuccess(response.data));
        yield* hideLoader(false, '');
        navigation.navigate('EnterPassword', {
          mobileNumber: mobileNumber,
          countryCode: countryCode,
        });
      } else if (
        response.exist === true &&
        response.passwordStatus == false
      ) {
        yield put(mobileFail());
        yield* hideLoader(false, '');
        navigation.navigate('VerifyOtp', {
          otp: response.data.OTP,
          mobileNumber,
          countryCode,
          countryName,
          isNew: 'no',
        });
      } else {
        debugger
        yield put(mobileFail());
        yield* hideLoader(false, '');
        navigation.navigate('VerifyOtp', {
          otp: response.data.OTP,
          mobileNumber,
          countryCode,
          countryName,
          isNew: 'yes',
        });
      }
    }else{
      yield put(mobileFail());
      yield* hideLoader(false, '');
      showToast(response.message ? response.message : 'Failed', 'danger')

    }
    
  } catch (error) {
    yield put(mobileFail());
    showToast(error.message, 'danger')
    yield* hideLoader(false, '');
  }
}

function* onloginWithSocialRequest({ data, navigation }) {
  yield* showLoader(false);
  try {
    let detail ={
      gid: data.googleId,
      fbid: data.facebookId,
      aid: data.appleId,
      fcmToken:data.fcmToken

    }
    const response = yield Request.post(
      Config.loginWithSocialURl,
      detail
    );
    debugger
    if (response.status === SUCCESS) {
      debugger
      if (response.exist === true) {
        yield put(profileSuccess(response.data));
        yield put(loginSuccess(response.data));
        connectSocket(response.data,data.fcmToken)

        yield put(loginWithSocialSuccess(response.data));
        yield* hideLoader(false, '');
        navigation.navigate('App');
      } else {
        yield* hideLoader(false, '');
        navigation.navigate('Signup',{
          ...data,
          registerType: 'Social'
        })
      }
    } else {
      yield put(mobileFail());
      yield* hideLoader(false, '');
      showToast(response.message ? response.message : 'Failed', 'danger')
    }
  } catch (error) {
    debugger
    yield put(mobileFail());
    yield* hideLoader(false, '');
    showToast(error.response && error.response.message ? error.response.message : 'Failed', 'danger')

  }
}

function* onBasicSettingRequest() {
  yield* showLoader(false);
  try {
    const profileData = yield Request.get(Config.getbasicinfo);
    if (profileData.status === SUCCESS) {
      yield put(basicSettingSuccess(profileData.data));
      yield* hideLoader(false, '');
    } else {
      yield put(basicSettingFailed());
      yield* hideLoader(false, '');
    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(basicSettingFailed());
  }
}

function* sagaMobile() {
  yield takeEvery(MOBILE_REQUESTED, onMobileRequest);
  yield takeEvery(BASIC_SETTING_REQUEST, onBasicSettingRequest);
  yield takeEvery(LOGIN_WITH_SOCIAL_REQUEST, onloginWithSocialRequest);
}
export default sagaMobile;
