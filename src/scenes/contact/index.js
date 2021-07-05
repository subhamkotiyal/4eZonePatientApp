
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Export all
import Contact from './views/contact';

const Stack = createStackNavigator();

// Setting Stack 
const ContactStack = () => {
  return <Stack.Navigator headerMode={'none'}>
       <Stack.Screen name="Contact" component={Contact} />

  </Stack.Navigator>
}

export default ContactStack;
