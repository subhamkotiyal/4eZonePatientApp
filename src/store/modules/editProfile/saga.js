import Axios from 'axios';
import {Alert} from 'react-native';
import {takeEvery, put, select} from 'redux-saga/effects';
import {
  PROFILEIM_REQUESTED,
  PROFILE_REQUESTED,
  BODYSHOT_REQUESTED,
  RBODYSHOT_REQUESTED,
} from './types';
import {
  profileImSuccess,
  uploadProfileSuccess,
  bodyShotSucess,
  removebodyShotSucess,
  apiEPFail,
} from './actions';
import {
  showLoader,
  showToast,
  hideLoader,
} from '_utils/methods';
import Config, { SUCCESS } from '_utils/constants/apiConstant';
import { Request } from '_services'
import {NavigationActions, StackActions} from  '@react-navigation/native';
import {loginSuccess} from '../password/actions';
import {profileSuccess} from '../getProfile/actions';

function showAlert(navigation, message) {
  setTimeout(() => {
    Alert.alert(
      'Updated!!',
      message,
      [
        {
          text: 'Okay',
          onPress: () => {
            navigation.goBack();
          },
        },
      ],
      {cancelable: false},
    );
  }, 600);
}

function* onProfileImageUpdate({profileData}) {
  debugger
  yield* showLoader(false);
  try {
    const response = yield  Request.post(Config.profileimage,profileData);
    console.log('data:   ' + JSON.stringify(response));
    if (response.status === SUCCESS) {
      yield put(loginSuccess(response.data));
      yield showToast(response.message,'success');
      yield put(profileSuccess(response.data));
      yield* hideLoader(false, '');
    } else {
      yield put(apiEPFail());
      yield* hideLoader(false, '');
      yield showToast(response.message,'danger');
    }
  } catch (error) {
    console.log(JSON.stringify(error));

    yield* hideLoader(false, '');
    yield put(apiEPFail());
  }
}

function* onProfileUpdate({profileData, navigation}) {
  debugger
  yield* showLoader(false);
  try {
    const response = yield Request.post(
      Config.updateprofile,
      profileData.profileData,
    );
    debugger
    if (response.status === SUCCESS) {
      yield* hideLoader(false, '');
      yield put(loginSuccess(response.data));
      yield put(profileSuccess(response.data));
      setTimeout(()=>{
        navigation.goBack()
      },10)
    } else {
      yield* hideLoader(false, '');
      yield put(apiEPFail());
      yield showToast(response.message,'danger');
    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(apiEPFail());
    yield showToast(error.message,'danger');

  }
}

function* sagaEditProfile() {
  yield takeEvery(PROFILEIM_REQUESTED, onProfileImageUpdate);
  yield takeEvery(PROFILE_REQUESTED, onProfileUpdate);
}
export default sagaEditProfile;
