import React from 'react';
import { View, } from 'react-native';
import { Text } from '_atoms'
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Typography, Colors, Mixins, AppStyles } from '_styles';
const { boxShadow } = Mixins
// Export all
import Dispute from './views/dispute';
import Claim from './views/claim';
import Reply from './views/reply';
import {TabItem} from './templates'
import { moderateScale } from 'react-native-size-matters';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

//Top Tabs
export const MyTopTabs = ({ completedDispute,inProcessDispute}) => {
    return (
        <Tab.Navigator
            initialRouteName="inProcess"
            tabBarOptions={{
                activeTintColor: Colors.primary,
                inactiveTintColor: 'rgba(0,0,0,0.6)',
                indicatorStyle: {
                    backgroundColor: Colors.primary,
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
                name="inProcess"
                component={()=><TabItem 
                    data={inProcessDispute}
                />}
                options={{ tabBarLabel: 'In Process' }}
            />
            <Tab.Screen
                name="completed"
                component={()=><TabItem 
                    data={completedDispute}
                />}
                options={{ tabBarLabel: 'Completed' }}
            />
        </Tab.Navigator>
    );
}


// Setting Stack 
const Disputestack = () => {
    return<Stack.Navigator headerMode={'none'}>
    <Stack.Screen name="Dispute" component={Dispute} />
    <Stack.Screen name="Claim" component={Claim} />
    <Stack.Screen name="Reply" component={Reply} />

</Stack.Navigator>
}

export default Disputestack;