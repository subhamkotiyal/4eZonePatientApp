
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view';
import { Typography, Colors, Mixins, AppStyles } from '_styles';

// Export all
import Profile from './views/profile';
import ChangePassword from './views/changePassword';
import AddressModal from '../auth/views/addressModal'
import EditProfile from './views/editProfile';
const Stack = createStackNavigator();
const RootStack =  createStackNavigator();
// Setting Stack 

function MainStackScreen() {
  return (
    <Stack.Navigator headerMode={'none'}>
    <Stack.Screen name="Profile" component={Profile} />
    <Stack.Screen name="ChangePassword" component={ChangePassword} />
</Stack.Navigator>
  );
}
function ProfileStack() {
  return ( <>
    <StatusBar barStyle="dark-content" backgroundColor={Colors.transparent} />
    <SafeAreaView
      style={[{ flex: 1, backgroundColor: Colors.white }]}>
      <RootStack.Navigator mode="modal"  headerMode={'none'}>
      <RootStack.Screen
        name="MainProfile"
        component={MainStackScreen}
      />
      <RootStack.Screen name="EditProfile" component={EditProfile} />
      <RootStack.Screen name="AddressModal" component={AddressModal} />
    </RootStack.Navigator>
    </SafeAreaView>
  </>
  );
}
export default ProfileStack;
