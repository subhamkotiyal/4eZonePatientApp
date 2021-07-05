import React, { useState, useRef, useEffect } from 'react';
// eslint-disable-next-line no-undef

import {
  View,
  TouchableOpacity,
  Platform,
  Image,
  ScrollView,
  Keyboard,
} from 'react-native';
import { Text, Button, TextInput, Header } from '_atoms';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import PhoneInput from 'react-native-phone-input';
import { ListModal } from '_molecules';
import { useDispatch, shallowEqual, useSelector } from 'react-redux';
import { Validation, Methods } from '_utils';
import { Images } from '_utils';
import { Typography, Colors, Mixins, AppStyles } from '_styles';
let { padding, windowWidth, boxShadow } = Mixins;
import { LogoHeader, AuthButton } from '../templates';
import { registerRequest } from '../../../store/modules/register/actions';
import CountryPicker, { Flag, getAllCountries } from 'react-native-country-picker-modal';

// Component
const Signup = ({ navigation, route }) => {

  /****************************** Get Store State & Hooks*************************************/
  const dispatch = useDispatch();
  let emailField,
    phoneRef,
    passwordField,
    nameField,
    addressField,
    gymField,
    contactField;
  const [state, setState] = useState({
    address: '',
    phone: route.params?.mobileNumber ?? '',
    name: route.params?.name ?? '',
    email: route.params?.email ?? '',
    registerType: route.params?.registerType ?? '',
    countryCode: route.params?.countryCode ?? '+46',
    countryName: route.params?.countryName ?? 'SE',
  });
  const { language, fcmToken = 'none' } = useSelector(state => ({
    language: state.switchLanguage.language,
    registerData: state.registerReducer.registerData,
    fcmToken: state.loginReducer.fcmToken,

  }));
  const [visible, setVisible] = useState(false);
  const [country, setCountryCode] = useState({});

  /****************************** Validation *************************************/
  const ValidationRules = () => {
    let {
      name = '',
      email = '',
      password = '',
      phone = '',
      address = '',
    } = state;
    let { code } = language;
    return [
      {
        field: name,
        name: 'Name',
        rules: 'required|alpha|no_space',
        lang: code,
      },
      {
        field: email,
        name: 'Email',
        rules: 'required|email|no_space',
        lang: code,
      },
      {
        field: password,
        name: 'Password',
        rules: 'required|no_space|min:8',
        lang: code,
      },
      {
        field: phone,
        name: 'Phone Number',
        rules: 'required|no_space|min:10',
        lang: code,
      },
      {
        field: address,
        name: 'Address',
        rules: 'required',
        lang: code,
      },
    ];
  };

  /****************************** API Function *************************************/
  const pressButton = () => {
    let {
      name = '',
      email = '',
      password = '',
      phone = '',
      address = '',
    } = state;
    let validation = Validation.validate(ValidationRules());
    let { showToast } = Methods;
    if (validation.length != 0) {
      showToast(validation[0].message, 'danger');
    } else {
      let data = {
        name: name,
        mobileNumber: phone,
        email: email,
        address: address,
        password: password,
        countryCode: route.params?.countryCode ?? '',
        countryName: route.params?.countryName ?? '',
        gid: route.params?.googleId ?? '',
        fbid: route.params?.facebookId ?? '',
        appleid: route.params?.appleId ?? '',
        OTP: route.params?.otp ?? '',
        profileImage: route.params?.photo ?? 'none',
        fcmToken: fcmToken
      };
      dispatch(registerRequest(data, navigation));
      //navigation.navigate('Thankyou')
    }
  };
  const [filterCountries, setFilterCountries] = useState([])
  useEffect(() => {
    filterAction()
  }, [])
  const filterAction = async () => {
    const countries = await getAllCountries()
    const response = countries.filter((contry) => {
      return contry.callingCode.length != 0
    }).map((x) => x.cca2)
    setFilterCountries(response)

  }
  const handleChange = (value, name) => {
    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  const onSelect = country => {
    // console.log(country,"countrycountry")
    setState(prevState => ({
      ...prevState,
      ['countryCode']: '+' + country.callingCode,
      ['countryName']: country.cca2,
    }));
    setVisible(false);
  };
  const setHandleAddress = (address, placeId, location) => {
    setState(prevState => ({
      ...prevState,
      ['address']: address,
      ['placeId']: placeId,
      ...location,
    }));
  };

  const getCountryCode = () => {
    let country = phoneRef.getCountryCode();
    let name = phoneRef.getISOCode();
    setState(prevState => ({
      ...prevState,
      ['countryCode']: '+' + country,
      countryName: name,
    }));
  };

  /****************************** Render Main  *************************************/
  return (
    <View style={[{ flex: 1, backgroundColor: Colors.white }]}>
      {/* <Header
      // image={Images.back}
      // onPressLeft={() => navigation.goBack()}
      rightStyle={{ flexDirection: 'row', }}
      style={[boxShadow('trasparent', {}, 0),
      {
        backgroundColor: 'transparent',
        paddingHorizontal: 0
      }]}
      textStyle={{ textAlign: 'center' }}
    /> */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounce={false}
        alwaysBounceVertical={false}
        contentContainerStyle={[padding(24, 24, 8, 24)]}
        style={{ backgroundColor: Colors.white }}
        keyboardShouldPersistTaps={'never'}>
        <View style={{ height: verticalScale(16) }} />

        <LogoHeader />
        <View style={{ flex: 0.5, marginTop: moderateScale(32) }}>
          {/*************** Name field *******************/}
          <TextInput
            label={''}
            inputMenthod={input => {
              nameField = input;
            }}
            placeholder={'Name'}
            placeholderTextColor="rgba(62,62,62,0.55)"
            returnKeyType="next"
            keyboardType="default"
            autoCorrect={false}
            autoCapitalize="none"
            blurOnSubmit={false}
            value={state.name}
            leftIcon={Images.nameIcon}
            viewTextStyle={AppStyles.viewTextStyle}
            underlineColorAndroid="transparent"
            isFocused={state.nameFieldFocus}
            onFocus={() => handleChange(true, 'nameFieldFocus')}
            onBlur={() => handleChange(false, 'nameFieldFocus')}
            onChangeText={text => handleChange(text, 'name')}
            onSubmitEditing={event => {
              emailField.focus();
            }}
          />
          <View style={{ height: verticalScale(24) }} />
          {/*************** Email field *******************/}
          <TextInput
            label={''}
            inputMenthod={input => {
              emailField = input;
            }}
            placeholder={'Email'}
            placeholderTextColor="rgba(62,62,62,0.55)"
            returnKeyType="next"
            keyboardType="email-address"
            autoCorrect={false}
            value={state.email}
            autoCapitalize="none"
            blurOnSubmit={false}
            leftIcon={Images.mailLight}
            viewTextStyle={AppStyles.viewTextStyle}
            underlineColorAndroid="transparent"
            isFocused={state.emailFieldFocus}
            onFocus={() => handleChange(true, 'emailFieldFocus')}
            onBlur={() => handleChange(false, 'emailFieldFocus')}
            onChangeText={text => handleChange(text, 'email')}
            onSubmitEditing={event => {
              passwordField.focus();
            }}
          />
          <View style={{ height: verticalScale(24) }} />

          {/*************** Password field *******************/}
          <TextInput
            placeholder={'Password'}
            inputMenthod={input => {
              passwordField = input;
            }}
            placeholderTextColor="rgba(62,62,62,0.55)"
            selectionColor="#96C50F"
            returnKeyType="next"
            keyboardType="default"
            autoCorrect={false}
            autoCapitalize="none"
            blurOnSubmit={false}
            secureTextEntry
            leftIcon={Images.lock}
            isFocused={state.passwordFieldFocus}
            viewTextStyle={AppStyles.viewTextStyle}
            onFocus={() => handleChange(true, 'passwordFieldFocus')}
            onBlur={() => handleChange(false, 'passwordFieldFocus')}
            onChangeText={text => handleChange(text, 'password')}
            underlineColorAndroid="transparent"
            onSubmitEditing={event => {
              phoneRef.focus();
            }}
          />
          <View style={{ height: verticalScale(24) }} />

          {/*************** Phone Input field *******************/}
          {/*************** Phone Input field *******************/}
          <View
            style={[
              AppStyles.signUptile,
              {
                ...boxShadow('black', { height: 1, width: 1 }, 2, 0.2),
                borderRadius: moderateScale(48) / 2,
              },
            ]}>
            <TouchableOpacity
              onPress={() => setVisible(true)}
              disabled={state.registerType == 'Social' ? false : true}

              style={{
                flex: windowWidth > 360 ? 0.35 : 0.38,
                flexDirection: 'row',
              }}>
              <Flag
                countryCode={state.countryName}
                flagSize={16}
                style={{ marginRight: 0 }}
              />
              <Text style={AppStyles.signUpcountryText}>
                {state.countryCode}{' '}
              </Text>
              <Image
                source={Images.selectnumber}
                style={AppStyles.signUpselectnumber}
              />
            </TouchableOpacity>
            <View style={AppStyles.signUpphoneInput}></View>

            <TextInput
              inputMenthod={ref => {
                phoneRef = ref;
              }}
              initialCountry={state.countryName}
              returnKeyType={'done'}
              value={state.phone}
              placeholder={'Phone Number'}
              editable={state.registerType == 'Social' ? true : false}
              viewTextStyle={[
                AppStyles.signUptile,
                {
                  flex: 0.5,
                  borderWidth: 0,
                  borderColor: 'white',
                  height: moderateScale(48),
                  ...boxShadow('transparent', { height: 0, width: 0 }, 0, 0),
                },
              ]}
              textInputStyle={[
                {
                  height: moderateScale(48),
                },
              ]}
              onChangeText={text => handleChange(text, 'phone')}
              offset={scale(28)}
            />
          </View>
          {/* <View
            style={[
              AppStyles.signUptile,
              {
                borderRadius: scale(48) / 2,
                ...boxShadow('black', {height: 0, width: 0}, 0.3, 0.5),
              },
            ]}>
            <View style={AppStyles.signUpphoneInput}></View>
            <TouchableOpacity
              onPress={() => setVisible(true)}
              style={AppStyles.signUpdropTextView}>
              <Text style={AppStyles.signUpcountryText}>
                {state.countryCode}{' '}
              </Text>
              <Image
                source={Images.selectnumber}
                style={AppStyles.signUpselectnumber}
              />
            </TouchableOpacity>

            <PhoneInput
              ref={ref => {
                phoneRef = ref;
              }}
              initialCountry={state.countryName}
              returnKeyType={'done'}
              disabled
              value={state.phone}
              flagStyle={AppStyles.signUpflag}
              disabled={state.registerType == 'Social' ? false : true}
              onChangePhoneNumber={phone => handleChange(phone, 'phone')}
              onSelectCountry={countryCode => getCountryCode(countryCode)}
              textProps={{
                returnKeyType: 'done',
                placeholder: 'Phone Number',
                placeholderTextColor: 'rgba(62,62,62,0.55)',
              }}
              textStyle={[
                AppStyles.phoneSearchSignpTextInput,
                {
                  marginLeft: windowWidth / 10,
                },
              ]}
              offset={scale(28)}
            />
          </View> */}
          <View style={{ height: verticalScale(24) }} />
          {/*************** Address field *******************/}
          <TextInput
            label={''}
            inputMenthod={input => {
              addressField = input;
            }}
            placeholder={'Address'}
            placeholderTextColor="rgba(62,62,62,0.55)"
            returnKeyType="next"
            onPress={() =>
              navigation.navigate('AddressModal', {
                address: state.address,
                "setHandleAddress":
                  setHandleAddress
              })
            }
            keyboardType="default"
            autoCorrect={false}
            value={state.address}
            // onTouchStart={() =>
            //   navigation.navigate('AddressModal', {
            //     address: state.address,

            //   })
            // }
            autoCapitalize="none"
            blurOnSubmit={false}
            leftIcon={Images.address2}
            isFocused={state.addressFieldFocus}
            multiline
            textInputStyle={{
              textAlignVertical: 'center',
              height: 'auto',
              paddingTop: Platform.OS == 'ios' ? moderateScale(12) : 0,
              minHeight: moderateScale(48),
            }}
            viewTextStyle={AppStyles.viewTextStyle}
            underlineColorAndroid="transparent"
          />
          <View style={{ height: verticalScale(24) }} />
        </View>

        <View style={{ height: verticalScale(24) }} />

        {/*************** Bottom Button *******************/}
        <BottomAbsoluteButton
          image={Images.next}
          customeStyle={{ bottom: 15 }}
          onPress={() => pressButton()}
        />
        {/*************** Not have account Text *******************/}
        <View
          activeOpacity={0.5}
          style={[AppStyles.forgotPassView, { alignItems: 'center' }]}>
          <Text
            p
            style={[
              AppStyles.becomePartner,
              {
                color: 'rgba(0,0,0,0.9)',
              },
            ]}>
            Already have an account?{' '}
            <Text
              onPress={() => navigation.navigate('Login')}

              h6
              style={[AppStyles.becomePartner, { color: 'rgba(0,0,0,0.9)' }]}>
              {' '}
              Sign in{' '}
            </Text>
          </Text>
        </View>
        <View style={{ height: verticalScale(16) }} />
      </ScrollView>
      {visible && (
        <CountryPicker
          {...{
            onSelect,
          }}
          countryCodes={filterCountries}
          withFilter
          ref={ref => (countryRef = ref)}
          onClose={() => setVisible(false)}
          containerButtonStyle={{ marginTop: 8 }}
          visible={visible}
        />
      )}
    </View>
  );
};

export default Signup;
