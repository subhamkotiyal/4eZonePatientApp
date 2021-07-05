
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Export all
import Support from './views/support';
import SupportMessage from './views/supportMessage';

const Stack = createStackNavigator();

// Setting Stack 
const SupportStack = () => {
  return <Stack.Navigator headerMode={'none'}>
       <Stack.Screen name="Support" component={Support} />
       <Stack.Screen name="SupportMessage" component={SupportMessage} />

  </Stack.Navigator>
}

export default SupportStack;
