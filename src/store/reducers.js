import {combineReducers} from 'redux';
import loginReducer from './modules/password/reducer';
import mobileReducer from './modules/login/reducer';
import loadingReducer from '_components/customeLoader/reducer';
import switchLanguage from './modules/languages/reducer';
import resetotpReducer from './modules/verifyOTP/reducer';
import registerReducer from './modules/register/reducer';
import getProfileReducer from './modules/getProfile/reducer';
import changePReducer from './modules/changePassword/reducer';
import editPReducer from './modules/editProfile/reducer';
import specialListReducer from './modules/specialList/reducer';
import nearByTrainerReducer from './modules/trainers/reducer';
import paymentListReducer from './modules/getPaymentMethodList/reducer';
import addPOSReducer from './modules/addPOS/reducer';
import fevoriteGymsReducer from './modules/fevoriteGyms/reducer';
import bookingReducer from './modules/booking/reducer';
import promoCodesReducer from './modules/promoCodes/reducer';
import fevoriteTrainerReducer from './modules/fevoriteTrainer/reducer';
import disputeReducer from './modules/dispute/reducer';
import supportReducer from './modules/support/reducer';
import questionaryReducer from './modules/questionary/reducer';
import addressReducer from './modules/address/reducer';
import nearByDoctorReducer from './modules/doctors/reducer';



import storage from '@react-native-community/async-storage';
import {debug} from 'react-native-reanimated';

export const logoutRequest = () => ({
  type: 'LOG_OUT',
});

const appReducer = combineReducers({
  mobileReducer,
  loginReducer,
  loadingReducer,
  addressReducer,
  switchLanguage,
  resetotpReducer,
  registerReducer,
  getProfileReducer,
  changePReducer,
  editPReducer,
  specialListReducer,
  questionaryReducer,
  nearByTrainerReducer,
  addPOSReducer,
  paymentListReducer,
  fevoriteGymsReducer,
  bookingReducer,
  promoCodesReducer,
  fevoriteTrainerReducer,
  disputeReducer,
  supportReducer,
  nearByDoctorReducer
});

const initialState = appReducer({}, {});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT_REQUESTED') {
    let fcmToken;
    Object.keys(state).forEach(key => {
      if (key == 'loginReducer') {
        fcmToken = state[key].fcmToken;
      }
      storage.removeItem(`persist:${key}`);
    });
    state = Object.assign(
      {},
      {
        ...initialState,
        loginReducer: {...initialState.loginReducer, fcmToken: fcmToken},
      },
    );
  }
  return appReducer(state, action);
};

export default rootReducer;
