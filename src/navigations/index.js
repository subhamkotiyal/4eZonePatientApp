import React, {useEffect, useState} from 'react';
import {Platform, View, Alert} from 'react-native';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useDispatch, shallowEqual, useSelector} from 'react-redux';
import KeyboardManager from 'react-native-keyboard-manager';
import FlashMessage from 'react-native-flash-message';
import {Indicator} from '_atoms';

import {RefRequests} from '_molecules';
import {Request} from '_services';
import Config, {SUCCESS} from '_utils/constants/apiConstant';
import messaging from '@react-native-firebase/messaging';
import NotificationSetting from 'react-native-open-notification';
import notifee from '@notifee/react-native';
import SplashScreen from 'react-native-splash-screen';
import {Methods,Configuration} from '_utils';
import {RtcEngine, AgoraView} from 'react-native-agora';
import useNotificationInitializer from '../hooks/useNotificationInitializer';
import SocketIOClient from 'socket.io-client';
import config from '../config';
//Stack Compoennt
import AuthNavigator from './auth-navigator';
import AppNavigator from './app-navigator';
const Stack = createStackNavigator();
import AgoraVideo from '../scenes/agoraVideo/index';
import {basicSettingRequest} from '../store/modules/login/actions'

//Main App render
const App = () => {
  /********************** Hooks Function **********************/
  const dispatch = useDispatch();
  const [isVideo, setIsVideo] = useState(false);
  const [refRequest, setReferRequest] = useState([]);
  const {user, fcmToken = null} = useSelector(state => ({
    user: state.loginReducer.loginData,
    fcmToken: state.loginReducer.fcmToken,
  }));
  useEffect(()=>{
    onGetBasicSetting()
  },[])
  let WSService;
  const [connectedSc,setConnected] = useState(false)
  const loading = useNotificationInitializer();
    /********************** Socket Function **********************/
    useEffect(() => {
      if (user && user._id) {
        let data = {};
        data['customerId'] = user._id;
        data['firebase_token'] = fcmToken;
        WSService = SocketIOClient(config.BASE_URL, {
          transports: ['polling'],
        });
        WSService.on('connect', () => {
          console.log('Connect socket 1')
          WSService.emit(`customersocket`, data, data => {
            console.log('Connect customersocket 1')

          });
        });
        Configuration.setConfiguration('Socket', WSService);
        setConnected(true)
      }else{
        setConnected(true)
      }
    }, []);
  useEffect(() => {
    if (Platform.OS === 'ios') {
      KeyboardManager.setToolbarPreviousNextButtonEnable(true);
    }
     setTimeout(()=>{
      SplashScreen.hide();
     },1500) 
    
  }, []);
  
  useEffect(() => {
    setTimeout(() => {
      getAllReferRequest();
    }, 2500);
  }, []);
  /********************** Socket Function **********************/
  useEffect(() => {
    if (user && user._id && WSService) {
    videoRequestFromDoctor();
    return () => {
      WSService.removeListener('customer_video_socket');
    };
  }
  }, []);
  useEffect(() => {
    if (user && user._id && WSService) {
    videoEndRequestFromDoctor();
    return () => {
      WSService.removeListener('customer_end_video_socket');
    };
  }
  }, []);

  const videoRequestFromDoctor = () => {
    WSService.on('customer_video_socket', data => {
      if (data && data.orderId) {
        VideoCallModal(data);
      }
    });
  };
  useEffect(() => {
    if (user && user._id && WSService) {
    orderCustomerReferRequest();
    return () => {
      WSService.removeListener('order_customer_socket');
    };
  }
  }, []);

  const orderCustomerReferRequest = () => {
    WSService.on('order_customer_socket', data => {
      console.log(data, 'datadatadatadata');
      if (data && data.orderId) {
        getAllReferRequest();
      }
    });
  };
  const videoEndRequestFromDoctor = () => {
    WSService.on('customer_end_video_socket', data => {
      endCall();
    });
  };
/********************** Connect Video Function **********************/
  const joinVideoCal = data => {
    if (data && data.orderId) {
      let uid = Math.floor(Math.random() * 100);
      RtcEngine.joinChannel(data.orderId, uid);
      RtcEngine.enableAudio(); //Join Channel
      setIsVideo(true);
    }
  };
  const VideoCallModal = data => {
    Alert.alert(
      'Video Call!',
      'Do you want accept this video call?',
      [
        {text: 'Yes', onPress: () => joinVideoCal(data)},
        {text: 'No', onPress: () => endLiveFeedAction(data)},
      ],
      {cancelable: false},
    );
  };
  const endCall = () => {
    //RtcEngine.destroy();
    RtcEngine.leaveChannel();
    setIsVideo(false);
  };
  /********************** Accept Reject Request **********************/
  const endLiveFeedAction = async data => {

    if (data && data.orderId) {
      let {orderId, customerId} = data;
        try {
          let data = {};
          data['customerId'] = customerId;
          data['orderId'] = orderId;
          let videoData = await Request.post(`${Config.endVideocalling}`, data);
          if (videoData.status === SUCCESS) {
            let uid = Math.floor(Math.random() * 100);
            endCall();
            setIsVideo(false);
          }
        } catch (err) {
          console.log(err.message, 'Error in fav');
        }
  
    }
  }
  const getAllReferRequest = async () => {
    debugger;
    let {showToast} = Methods;
    if (user && user._id) {
      try {
        let data = {};
        let apiName = Config.getAllCustomerBooking;
        data['customerId'] = user._id;
        const referRequest = await Request.post(apiName, data);
        if (referRequest.status == SUCCESS) {
          setReferRequest(referRequest.data.data);
        } else {
          showToast(referRequest.message, 'danger');
        }
      } catch (err) {
        showToast(err.message, 300);
      }
    }
  };
  const updateRefList = item => {
    let filterItem = refRequest.filter(x => x._id != item._id);
    setReferRequest(filterItem);
  };

  const onGetBasicSetting = ()=>{
    dispatch(basicSettingRequest())
  }
  /************************  Render Main App   ****************************/
  if (loading && connectedSc) {
  return (
    <View style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator headerMode={'none'}>
          {user && user.token ? (
            <>
              <Stack.Screen name="App" component={AppNavigator} />
            </>
          ) : (
            <>
              <Stack.Screen name="Auth" component={AuthNavigator} />
            </>
          )}
        </Stack.Navigator>
        <FlashMessage position="top" animated={true} />
        <Indicator />
        <AgoraVideo isVideo={isVideo} endCall={endCall} />
        {/***********  ***********/}
        {refRequest && refRequest.length > 0 ? (
          <RefRequests
            refRequest={refRequest}
            updateRefList={item => updateRefList(item)}
          />
        ) : null}
      </NavigationContainer>
    </View>
  );
    } else {
          return <View />;
  }
};

export default App;
