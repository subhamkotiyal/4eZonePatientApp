import AsyncStorage from '@react-native-community/async-storage';
import {takeEvery, put} from 'redux-saga/effects';
import {GETPROFILE_REQUEST} from './types';
import {profileSuccess, profileFail} from './actions';
import {NavigationActions, StackActions} from  '@react-navigation/native';
import {
  showLoader,
  showToast,
  hideLoader,
} from '_utils/methods';
import Config, { SUCCESS } from '_utils/constants/apiConstant';
import { Request } from '_services'
import {loginSuccess} from '../password/actions';

function* onProfileRequested({navigation}) {
  yield* showLoader(false);
  try {
    const profileData = yield Request.get(Config.profile);
    if (profileData.data.status === SUCCESS) {
      yield put(loginSuccess(profileData.data.data));
      yield put(profileSuccess(profileData.data.data));
      yield* hideLoader(false, '');
      navigation.navigate('App');
    } else {
      yield put(profileFail());
      yield* hideLoader(false, '');
      setTimeout(() => {
        const resetAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({routeName: Config.SideMenu})],
        });
        navigation.dispatch(resetAction);
      }, 600);
    }
  } catch (error) {
    // console.log(JSON.stringify(error));
    yield* hideLoader(false, '');
    setTimeout(() => {
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: Config.Login})],
      });
      navigation.dispatch(resetAction);
    }, 800);
    yield put(profileFail());
  }
}




function* sagaProfile() {
  yield takeEvery(GETPROFILE_REQUEST, onProfileRequested);
}
export default sagaProfile;
