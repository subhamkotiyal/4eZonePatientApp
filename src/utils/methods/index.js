import { showMessage, hideMessage } from "react-native-flash-message";
import { Images } from '_utils'
const imageJsonUrl = 'https://xcarpentier.github.io/react-native-country-picker-modal/countries/';

import {takeEvery, put} from 'redux-saga/effects';

import { hideLoading, showLoading } from '../../components/customeLoader/action';


export function* hideLoader(isError, errorMessage) {
  yield put(hideLoading(isError, errorMessage));
}
export function* showLoader(silentFetch) {
  if (!silentFetch) {
    yield put(showLoading());
  }
}

export const showToast = (message, type) => showMessage({
  message: `${message}`,
  type: type,
  icon: 'auto'
});


export const hideToast = (message, type) => showMessage({
  message: `${message}`,
  type: type,
  icon: 'auto'
});


// First Letter capital  
export const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

// Return Tab Icon Name
export const returnIconName = (routeName, focused, user) => {
  let iconName
  if (routeName === 'Drawer') {
    iconName = focused
      ? Images.menuMore
      :  Images.menuMore;
  } else if (routeName === 'Home') {
    iconName = focused
      ? Images.homeprofile
      : Images.homeprofile
  }
  else if (routeName === 'Bookings') {
    iconName = focused
    ? Images.listactive
    : Images.list
  } else if (routeName === 'Cart') {
    iconName = focused
    ? Images.cartactive
    : Images.cart
  } else if (routeName === 'More') {
    iconName = focused
    ? Images.moreactive
    : Images.more
  }
  return iconName
}

export const formatPhoneNumber=(name)=>{
        var cleaned = ('' + name).replace(/\D/g, '')
        var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
        if (match) {
          return match[1] + '-' + match[2] + '-' + match[3]
        }else{
            return name
     }

}


export const getAllCountries = () =>{
 return fetch(imageJsonUrl)
  .then((response) => response.json())
  .then((remoteData) => {
    return remoteData
})
}