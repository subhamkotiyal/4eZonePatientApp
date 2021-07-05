import React, { useState, useRef, useEffect, } from 'react';
import { View, TouchableOpacity, Image, ScrollView, Keyboard } from 'react-native';
import { Text, Button, TextInput, Header } from '_atoms'
import { BottomAbsoluteButton } from '_molecules'

import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { Images } from '_utils'
import { Typography, Colors, Mixins, AppStyles } from '_styles';

let {boxShadow, padding } = Mixins


// Component 
const ForgotEmail = ({ navigation }) => {

  /****************************** Get Store State & Hooks*************************************/
  let emailField
  const [state, setState] = useState({});
  
/****************************** API Function *************************************/
  const pressButton = () => {

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
      style={[boxShadow('trasparent',{},0)]}
      title={'Forgot email'}
      textStyle={{textAlign:'center'}}
      />
    <ScrollView 
          showsVerticalScrollIndicator={false}

    contentContainerStyle={[padding(24),
      {backgroundColor:'white'}]}
     keyboardShouldPersistTaps={'never'}>

   <View style={{ flex: 0.5, marginTop: moderateScale(4) }}>
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
          autoCapitalize="none"
          blurOnSubmit={false}
          isFocused={state.emailFieldFocus}
          leftIcon={Images.mailLight}
          viewTextStyle={[AppStyles.viewTextStyle,{
            borderRadius:moderateScale(48)/2
          }]}
          underlineColorAndroid="transparent"
          onFocus={() => handleChange(true, 'emailFieldFocus')}
          onBlur={() => handleChange(false, 'emailFieldFocus')}
          onChangeText={(text) => handleChange(text, 'email')}
          onSubmitEditing={event => {
            passwordField.focus();
          }}
        />
       </View>
    </ScrollView>
    <BottomAbsoluteButton image={Images.tick}/>

  </View>
}

export default ForgotEmail;