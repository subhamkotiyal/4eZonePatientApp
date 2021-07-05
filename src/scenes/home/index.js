
import React from 'react';
import { StatusBar } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SafeAreaView from 'react-native-safe-area-view';
// Export all
import { Typography, Colors, Mixins, AppStyles } from '_styles';
import { moderateScale } from 'react-native-size-matters';

import Home from './views/home';
import SearchSpecialList from './views/searchSpecialList';

// import Gyms from './views/gyms';
import Doctors from './views/doctors';
import DoctorDetails from './views/details';
import { SessionTabItem, DetailTabItem } from './templates';
import BookingInfo from './views/bookingInfo';
import AddressModal from '../auth/views/addressModal';
import Schedule from './views/schedule';
import PaymentStack from '../payments'
import Coupons from './views/coupon'
import Questionary from './views/questionary';

const Stack = createStackNavigator();
const RootStack = createStackNavigator()
const Tab = createMaterialTopTabNavigator();
const { boxShadow } = Mixins
//Top Tabs
export const MyTopTabs = ({ sessions, trainers, onSelect,onSelectTrainer ,from}) => {
    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: Colors.primary2,
                inactiveTintColor: 'rgba(0,0,0,1)',
                indicatorStyle: {
                    backgroundColor: Colors.primary2,
                    height: moderateScale(1.5)
                },
                labelStyle: {
                    fontFamily: Typography.FONT_FAMILY_BOLD,
                    fontSize: Typography.normalize(16),
                    textTransform: 'capitalize'

                },
                style: {
                    marginTop: -moderateScale(12),
                    backgroundColor: 'white', ...boxShadow('black')
                },
            }}
        >
            <Tab.Screen
                name="Session"
                  component={() => <SessionTabItem
                    onSelect={onSelect}
                    sessions={sessions}
                     />}
                options={{ tabBarLabel: 'Session' }}
            />
            <Tab.Screen
                name="Details"
                component={() => <DetailTabItem 
                    onSelect={onSelectTrainer}
                    from={from}
                    trainers={trainers} />}
                options={{ tabBarLabel: 'Details' }}
            />
        </Tab.Navigator>
    );
}

// Setting Stack 
const HomeStack = () => {
    return <Stack.Navigator headerMode={'none'}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Doctors" component={Doctors} />

        <Stack.Screen name="DoctorDetails" component={DoctorDetails} />

        <Stack.Screen name="Questionary" component={Questionary} />

    </Stack.Navigator>
}
function MainHomeNavigator() {
    return (<RootStack.Navigator mode="modal" headerMode={'none'}>
        <RootStack.Screen
            name="Home"
            component={HomeStack}
        />
        <RootStack.Screen name="Schedule" component={Schedule} />
        <RootStack.Screen name="BookingInfo" component={BookingInfo} />
        <RootStack.Screen name="AddressModal" component={AddressModal} />
        {/* <RootStack.Screen name="PaymentStack"
            component={PaymentStack} /> */}
        <RootStack.Screen name="Coupons" component={Coupons} />
        <RootStack.Screen name="SearchSpecialList" component={SearchSpecialList} />

    </RootStack.Navigator>
    );
}
export default MainHomeNavigator;
