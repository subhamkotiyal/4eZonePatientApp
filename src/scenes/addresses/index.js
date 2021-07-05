import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// Export all
import Addresses from './views/addresses';
import AddAddress from './views/addAddress';
import {
  AddressModal,
} from '_scenes/auth';
const Stack = createStackNavigator();
const RootStack = createStackNavigator();

// Setting Stack
const Addressstack = () => {
  return (
    <Stack.Navigator headerMode={'none'}>
      <Stack.Screen name="Addresses" component={Addresses} />
      <Stack.Screen name="AddAddress" component={AddAddress} />

    </Stack.Navigator>
  );
};
// Setting Stack
const RootAddressstack = () => {
  return (
    <RootStack.Navigator headerMode={'none'} mode="modal" >
      <RootStack.Screen name="Addresses" component={Addressstack} />
      <RootStack.Screen name="AddressModal" component={AddressModal} />
    </RootStack.Navigator>
  );
};
export default RootAddressstack;
