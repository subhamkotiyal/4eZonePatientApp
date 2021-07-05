
import localNotificationDefaultConfig from './localNotificationDefaultConfig';
import PushNotification from 'react-native-push-notification';
import {Platform} from 'react-native';

const isIos = Platform.OS === 'ios';

export const handleFcmMessage = (message, appState, dispatch = null) => {
    triggerLocalNotification(message)
};
const triggerLocalNotification = (message) => {
  PushNotification.localNotification({
    ...localNotificationDefaultConfig,
    message:'Test messgae'

  });
};

