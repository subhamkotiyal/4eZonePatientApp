import React from 'react';
import { View, Text, TouchableOpacity, StatusBar,Image } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Methods, Images } from '_utils'
import SafeAreaView from 'react-native-safe-area-view';

import { CustomDrawer } from '_atoms'
import HomeStack from '_scenes/home';
import BookingsStack from '_scenes/bookings';
import AddressesStack from '_scenes/addresses';

import PaymentsStack from '_scenes/payments';
import {ThankYoustack} from '_scenes/payments';

import ProfileStack from '_scenes/profile';
import SharesStack from '_scenes/shares';
import SupportsStack from '_scenes/supports';

import { Typography, Colors, Mixins, AppStyles } from '_styles';
import { moderateScale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/core';

//Import Stack 
const Drawer = createDrawerNavigator();
const { returnIconName } = Methods




// Drawer Navigator
const DrawerNavigator = () => {
  return(<>
    <StatusBar barStyle="dark-content" backgroundColor={Colors.transparent} />
    <SafeAreaView
      style={[{ flex: 1, backgroundColor: Colors.white }]}> 
      <Drawer.Navigator
    drawerType="front"
    initialRouteName="MainHome"
    drawerContent={(props) => <CustomDrawer {...props} />}>
    <Drawer.Screen name="MainHome" component={HomeStack} />
    <Drawer.Screen name="Bookings" component={BookingsStack} />
    <Drawer.Screen name="Shares" component={SharesStack} />
    <Drawer.Screen name="Payments" component={PaymentsStack} />
    <Drawer.Screen name="Support" component={SupportsStack} />
    <Drawer.Screen name="Profile" component={ProfileStack} />
    <Drawer.Screen name="Addresses" component={AddressesStack} />
    <Drawer.Screen name="ThankyouSuccess" component={ThankYoustack} />

  </Drawer.Navigator>
  </SafeAreaView>
  </>)
}




export default DrawerNavigator;