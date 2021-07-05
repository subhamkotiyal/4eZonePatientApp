import React, { useState, useRef, useEffect, } from 'react';
import { View, TouchableOpacity, Image, ScrollView, Keyboard } from 'react-native';
import { Text, Button, TextInput, Header } from '_atoms'
import { BottomAbsoluteButton } from '_molecules'
import { Validation, Methods } from '_utils'
import { useDispatch, shallowEqual, useSelector } from "react-redux";

import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { Images } from '_utils'
import { Typography, Colors, Mixins, AppStyles } from '_styles';
import { loginRequest } from '../../../store/modules/password/actions';

let { boxShadow, padding } = Mixins


// Component 
const EnterPassword = ({ navigation,route }) => {

  /****************************** Get Store State & Hooks*************************************/
  let confirmpasswordField, passwordField
  /****************************** Get Store State & Hooks*************************************/
  const dispatch = useDispatch()
  const [state, setState] = useState({});
  const { language,fcmToken='No Token' } = useSelector(state => ({
    language: state.switchLanguage.language,
    loginData: state.loginReducer.loginData,
    isBusy: state.loginReducer.isBusy,
    fcmToken:state.loginReducer.fcmToken
  }));
  /****************************** Validation *************************************/
  const ValidationRules = () => {
    let { password = '' } = state;
    let { code } = language;
    return [
      {
        field: password,
        name: 'Password',
        rules: 'required|no_space|min:6',
        lang: code
      },
    ];

  };
  /****************************** API Function *************************************/
  const pressButton = () => {
    let { password = '', } = state;
    let validation = Validation.validate(ValidationRules());
    let { showToast } = Methods
    if (validation.length != 0) {
      showToast(validation[0].message, 'danger')
    } else {
      dispatch(loginRequest(
        route.params.countryCode,
         route.params.mobileNumber,
        password,
        fcmToken,
        navigation,
      ))
    }
  }
  /****************************** Function Main  *************************************/
  const handleChange = (value, name) => {
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const forgotPassword = () => {
      navigation.navigate('VerifyOtp', {
      mobileNumber: route.params?.mobileNumber?? '',
      forgot: true,
      countryCode: route.params?.countryCode ?? '',
    });
  }
  /****************************** Render Main  *************************************/
  return <View style={[{ flex: 1, backgroundColor: Colors.white }]}>
    <Header
      leftText
      style={[boxShadow('trasparent', {}, 0)]}
      title={'Enter password'}
      textStyle={{ textAlign: 'center' }}
    />
    <ScrollView 
          showsVerticalScrollIndicator={false}

    contentContainerStyle={[padding(24),
    { backgroundColor: 'white' }]}
      keyboardShouldPersistTaps={'never'}>

      <View style={{ flex: 0.5, marginTop: moderateScale(4) }}>
        {/*************** Email field *******************/}
        <TextInput
          placeholder={'Enter Password'}
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
          viewTextStyle={[AppStyles.viewTextStyle, {
            borderRadius: moderateScale(48) / 8
          }]}
          isFocused={state.passwordFieldFocus}
          onFocus={() => handleChange(true, 'passwordFieldFocus')}
          onBlur={() => handleChange(false, 'passwordFieldFocus')}
          onChangeText={(text) => handleChange(text, 'password')}
          underlineColorAndroid="transparent"
          onSubmitEditing={event => {
            Keyboard.dismiss()

          }}
        />
        <View style={{ height: verticalScale(24) }} />
        {/*************** Forgot Text *******************/}
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => forgotPassword()}
          style={{ alignItems: 'flex-end', flex: 1 }}
        >
          <View style={[AppStyles.forgotPassView, { alignItems: 'flex-start' }]}>
            <Text h6 style={[AppStyles.becomePartne,{color:Colors.primary}]}>
              {'Forgot Password'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
    <BottomAbsoluteButton image={Images.next}
      onPress={() => pressButton()} />

  </View>
}

export default EnterPassword;