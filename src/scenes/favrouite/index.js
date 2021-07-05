
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Export all
import Favrouite from './views/favrouite';

const Stack = createStackNavigator();

// Setting Stack 
const Favrouitestack = () => {
  return <Stack.Navigator headerMode={'none'}>
       <Stack.Screen name="Favrouite" component={Favrouite} />

  </Stack.Navigator>
}

export default Favrouitestack;
