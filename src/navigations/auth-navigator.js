import React from 'react';
import {StatusBar} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';

import {createStackNavigator} from '@react-navigation/stack';
import {
  Login,
  Signup,
  AddressModal,
  ForgotPassword,
  EnterPassword,
  VerifyOtp,
  Thankyou,
} from '_scenes/auth';
import {Typography, Colors, Mixins, AppStyles} from '_styles';
const Stack = createStackNavigator();
const RootStack = createStackNavigator();

function MainStackScreen() {
  return (
    <Stack.Navigator headerMode={'none'}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="AddressModal" component={AddressModal} />

    </Stack.Navigator>
  );
}

function AuthNavigator() {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.transparent} />
      <SafeAreaView style={[{flex: 1, backgroundColor: Colors.white}]}>

         <RootStack.Navigator mode="modal" headerMode={'none'}>
          <RootStack.Screen name="MainAuth" component={MainStackScreen} />
          <RootStack.Screen name="Thankyou" component={Thankyou} />
          <RootStack.Screen name="VerifyOtp" component={VerifyOtp} />
          <RootStack.Screen name="EnterPassword" component={EnterPassword} />
          <RootStack.Screen name="ForgotPassword" component={ForgotPassword} />

        </RootStack.Navigator>
      </SafeAreaView>
    </>
  );
}
export default AuthNavigator;
