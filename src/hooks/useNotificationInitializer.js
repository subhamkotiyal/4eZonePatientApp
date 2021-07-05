import {useState, useEffect, useRef} from 'react';
import {shallowEqual, useSelector, useDispatch} from 'react-redux';

import useNotificationRegisterer from './useNotificationRegisterer';
import messaging from '@react-native-firebase/messaging';
import {handleFcmMessage} from '../utils/notificationsAndMessagesHandlers/index';
import PushNotification from 'react-native-push-notification';
import {saveFcmTokenRequest} from '../store/modules/password/actions';

//Open notification setting
const openNotificationSetting = () => {
  return Alert.alert(
    'User has notification permissions disabled',
    'You can manually allow notifications via the Settings',
    [
      {text: 'Cancel', onPress: () => {}, style: 'cancel'},
      {text: 'Open', onPress: () => NotificationSetting.open()},
    ],
    {cancelable: false},
  );
};
const useNotificationInitializer = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  let unsubscribeMessageHandler = useRef(null);
  const registerForNotification = useNotificationRegisterer();
  /********************** Notification Permission function **********************/
  useEffect(() => {
    // Get the device token
    checkApplicationPermission();
  }, []);

  async function checkApplicationPermission() {
    const authorizationStatus = await messaging().requestPermission();
    if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
      getToken();
      console.log('User has notification permissions enabled.');
    } else if (
      authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL
    ) {
      getToken();
      await notifee.requestPermission({
        sound: true,
      });
      console.log('User has provisional notification permissions.');
    } else {
      openNotificationSetting();
      console.log('User has notification permissions disabled');
    }
  }
  // Get token
  const getToken = async () => {
    messaging()
      .getToken()
      .then(token => {
        return dispatch(saveFcmTokenRequest(token));
      });
    // Listen to whether the token changes
    return messaging().onTokenRefresh(token => {
      dispatch(saveFcmTokenRequest(token));
    });
  };
  useEffect(() => {
    registerForNotification();
    setUpMessageHandler();
    return () => {
      unsubscribeMessageHandler.current();
    };
  }, []);
  const setUpMessageHandler = () => {
    unsubscribeMessageHandler.current = messaging().onMessage(message => {
      handleFcmMessage(message, 'FOREGROUND', dispatch);
    });
  };
  return loading;
};

export default useNotificationInitializer;
