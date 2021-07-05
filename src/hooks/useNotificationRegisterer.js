import {Platform, Alert} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
import {handleFcmMessage} from '../utils/notificationsAndMessagesHandlers/index';

const isIos = Platform.OS === 'ios';

const useNotificationRegisterer = () => {
  const dispatch = useDispatch();
  const register = async uid => {
    PushNotification.configure({
      popInitialNotification: true,
      onNotification: onReceiveNotificationOnIos,
    });
    try {
      await messaging().registerDeviceForRemoteMessages();
      const fcmToken = await messaging().getToken();
      console.log(fcmToken, 'register');
    } catch (error) {
      console.log(error);
    }
  };
  const onReceiveNotificationOnIos = notification => {
    const message = {data: notification};
    console.log(notification,"notification ha ios")
    handleFcmMessage(message, 'FOREGROUND', dispatch);
  };
  return register;
};

export default useNotificationRegisterer;
