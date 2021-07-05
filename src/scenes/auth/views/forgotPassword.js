import React, { useState, useRef, useEffect, } from 'react';
import { View, TouchableOpacity, Image, ScrollView, Keyboard } from 'react-native';
import { Text, Button, TextInput, Header } from '_atoms'
import { BottomAbsoluteButton } from '_molecules'
import { useDispatch, shallowEqual, useSelector } from "react-redux";
import { Validation, Methods } from '_utils'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { Images } from '_utils'
import { Typography, Colors, Mixins, AppStyles } from '_styles';
import { resetPRequest } from '../../../store/modules/changePassword/actions';

let { boxShadow, padding } = Mixins


// Component 
const ForgotPassword = ({ navigation,route }) => {
  /****************************** Get Store State & Hooks*************************************/
  const dispatch = useDispatch()
  let confirmpasswordField, passwordField
  const [state, setState] = useState({});
  const { language } = useSelector(state => ({
    language: state.switchLanguage.language,
    resetData: state.changePReducer.data,
  }));
  /****************************** Validation *************************************/
  const ValidationRules = () => {
    let { password = '', confirmPassword = '' } = state;
    let { code } = language;
    return [
      {
        field: password,
        name: 'Password',
        rules: 'required|no_space|min:8',
        lang: code
      },
      {
        field: confirmPassword,
        name: 'Confirm Password',
        rules: 'required|no_space|min:8',
        lang: code
      }
    ];

  };

  /****************************** API Function *************************************/
  const pressButton = () => {
    let { password = '', confirmPassword = '' } = state;
    let validation = Validation.validate(ValidationRules());
    let { showToast } = Methods
    if (validation.length != 0) {
      showToast(validation[0].message, 'danger')
    }else if (password != confirmPassword) {
      showToast('Password and Confirm Password doesn`t match!','danger')
    } else {
      let data = {
      password:password,
      confirmPassword: confirmPassword,
      mobileNumber:route.params?.mobileNumber ??'',
      OTP: route.params?.otp ??'',
    };
      dispatch(resetPRequest(data, navigation))
    }
  }
  /****************************** Function Main  *************************************/
  const handleChange = (value, name) => {
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  /****************************** Render Main  *************************************/
  return <View style={[{ flex: 1, backgroundColor: Colors.white }]}>
    <Header
      leftText
      style={[boxShadow('trasparent', {}, 0)]}
      title={'Forgot password'}
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
          placeholder={'New Password'}
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
            borderRadius: moderateScale(48) / 6
          }]}
          isFocused={state.passwordFieldFocus}
          onFocus={() => handleChange(true, 'passwordFieldFocus')}
          onBlur={() => handleChange(false, 'passwordFieldFocus')}
          onChangeText={(text) => handleChange(text, 'password')}
          underlineColorAndroid="transparent"
          onSubmitEditing={event => {
            confirmpasswordField.focus()

          }}
        />
        <View style={{ height: verticalScale(24) }} />
        <TextInput
          placeholder={'Confirm Password'}
          inputMenthod={input => {
            confirmpasswordField = input;
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
            borderRadius: moderateScale(48) / 6
          }]}
          isFocused={state.confirmPasswordFieldFocus}
          onFocus={() => handleChange(true, 'confirmPasswordFieldFocus')}
          onBlur={() => handleChange(false, 'confirmPasswordFieldFocus')}
          onChangeText={(text) => handleChange(text, 'confirmPassword')}
          underlineColorAndroid="transparent"
          onSubmitEditing={event => {
            Keyboard.dismiss()

          }}
        />
      </View>
    </ScrollView>
    <BottomAbsoluteButton image={Images.next} onPress={()=>pressButton()} />

  </View>
}

export default ForgotPassword;