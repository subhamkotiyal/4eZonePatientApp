/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';

import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';

// // Register background handler
// messaging().setBackgroundMessageHandler(async remoteMessage => {
// //Remote message
// });
AppRegistry.registerComponent(appName, () => App);
