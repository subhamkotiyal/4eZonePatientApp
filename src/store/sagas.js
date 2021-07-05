import {all} from 'redux-saga/effects';
import sagaLogin from './modules/password/saga';
import sagaMobile from './modules/login/saga';
import sagaRegister from './modules/register/saga';
import sagaVerifyOtp from './modules/verifyOTP/saga';
import sagaProfile from './modules/getProfile/saga';
import sagaChangeP from './modules/changePassword/saga';
import sagaEditProfile from './modules/editProfile/saga';
import sagaSpecialList from './modules/specialList/saga';
import sagaNearByTrainer from './modules/trainers/saga';
import sagaAddPOS from './modules/addPOS/saga'
import sagaPaymentMethodList from './modules/getPaymentMethodList/saga';
import sagaFevoriteGyms from './modules/fevoriteGyms/saga';
import sagaAddRemoveFevorite from './modules/addRemoveFevorite/saga';
import sagaBooking from './modules/booking/saga';
import sagaPromoCodes from './modules/promoCodes/saga';
import sagaAddRemoveFavoriteTrainer from './modules/addRemoveFavoriteTrainer/saga';
import sagaFevoriteTrainer from './modules/fevoriteTrainer/saga';
import sagaDispute from './modules/dispute/saga';
import sagaSupport from './modules/support/saga';
import sagaQuestionary from './modules/questionary/saga';
import sagaAddress from './modules/address/saga';
import sagaNearByDoctor from './modules/doctors/saga';

export default function* rootSaga() {
  yield all([
    sagaLogin(),
    sagaMobile(),
    sagaVerifyOtp(),
    sagaRegister(),
    sagaProfile(),
    sagaChangeP(),
    sagaEditProfile(),
    sagaSpecialList(),
    sagaNearByTrainer(),
    sagaPaymentMethodList(),
    sagaAddPOS(),
    sagaFevoriteGyms(),
    sagaAddRemoveFevorite(),
    sagaBooking(),
    sagaPromoCodes(),
    sagaAddRemoveFavoriteTrainer(),
    sagaFevoriteTrainer(),
    sagaDispute(),
    sagaSupport(),
    sagaQuestionary(),
    sagaAddress(),
    sagaNearByDoctor()
  ]);
}
