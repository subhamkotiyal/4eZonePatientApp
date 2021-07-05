
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Export all
import ReferFriend from './views/referFriend';

const Stack = createStackNavigator();

// Setting Stack 
const ReferStack = () => {
  return <Stack.Navigator headerMode={'none'}>
       <Stack.Screen name="ReferFriend" component={ReferFriend} />

  </Stack.Navigator>
}

export default ReferStack;
