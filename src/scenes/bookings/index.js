
import React from 'react';
import { View, } from 'react-native';
import { Text } from '_atoms'
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Typography, Colors, Mixins, AppStyles } from '_styles';
import { moderateScale } from 'react-native-size-matters';

const { boxShadow } = Mixins
// Export all
import MyBooking from './views/mybooking';
import {TabItem} from './templates'
import BookingDetail  from './views/bookingDetail';
import Rating from './views/rating'
import SendDispute from './views/sendDispute';
const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

//Top Tabs
export const MyTopTabs = ({pastBooking,upcomingBooking}) => {
    return (
        <Tab.Navigator
            initialRouteName="Upcoming"
            tabBarOptions={{
                activeTintColor: Colors.black,
                inactiveTintColor: 'rgba(0,0,0,0.3)',
                indicatorStyle: {
                    backgroundColor: Colors.black,
                    height: moderateScale(2)
                },
                labelStyle: {
                    fontFamily: Typography.FONT_FAMILY_BOLD,
                    fontSize: Typography.normalize(18),
                    textTransform:'capitalize'

                },
                style: { backgroundColor: 'white', ...boxShadow('black') },
            }}
        >
            <Tab.Screen
                name="Upcoming"
                component={({navigation,route})=><TabItem data={upcomingBooking} navigation={navigation} route={route}/>}
                options={{ tabBarLabel: 'Upcoming' }}
            />
            <Tab.Screen
                name="Past"
                component={({navigation,route})=><TabItem data={pastBooking} navigation={navigation} route={route}/>}
                options={{ tabBarLabel: 'Past' }}
            />
        </Tab.Navigator>
    );
}


// Setting Stack 
const BookingStack = () => {
    return <Stack.Navigator headerMode={'none'}>
        <Stack.Screen name="Bookings" component={MyBooking} />
        <Stack.Screen name="BookingDetail" component={BookingDetail} />
        <Stack.Screen name="Rating" component={Rating} />
        <Stack.Screen name="SendDispute" component={SendDispute} />

    </Stack.Navigator>
}

export default BookingStack;