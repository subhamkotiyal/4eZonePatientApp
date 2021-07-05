import Axios from 'axios';
import { AsyncStorage } from 'react-native';
import { takeEvery, put } from 'redux-saga/effects';
import * as types from './types'
import { languageFail, switchlanguageData } from './actions';
import {
  showLoader,
  hideLoader,
} from '_utils/methods';
import { Request } from '_services'

function* onChangeLanguageRequest({
  language,
}) {
  yield* showLoader(false);
  try {
    //TODO: set language api
  } catch (error) {
    //console.log(JSON.stringify(error));
    yield put(languageFail());
    yield* hideLoader(false, '');
  }
}
function* sagaLanguage() {
  yield takeEvery(types.SWITCH_LANGUAGE_DATA, onChangeLanguageRequest);
}
export default sagaLanguage;
