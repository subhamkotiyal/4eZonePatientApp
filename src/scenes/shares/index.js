
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Export all
import Share from './views/share';

const Stack = createStackNavigator();

// Setting Stack 
const ShareStack = () => {
  return <Stack.Navigator headerMode={'none'}>
       <Stack.Screen name="Share" component={Share} />

  </Stack.Navigator>
}

export default ShareStack;
