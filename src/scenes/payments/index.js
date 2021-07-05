
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Export all
import Payments from './views/payments';
import AddPayment from './views/addPayment';
import DonePayement from './views/donePayment';
import Thankyou from './views/thankyou';

const Stack = createStackNavigator();

// Setting Stack 
const Paymentstack = () => {
  return <Stack.Navigator headerMode={'none'}
  
  >
       <Stack.Screen name="Payments" component={Payments} />
       <Stack.Screen name="AddPayment" component={AddPayment} />
       <Stack.Screen name="DonePayement" component={DonePayement} />

  </Stack.Navigator>
}
// Setting Stack 
export const ThankYoustack = () => {
  return <Stack.Navigator headerMode={'none'}>
       <Stack.Screen name="Thankyou" component={Thankyou} />
  </Stack.Navigator>
}
export default Paymentstack;


