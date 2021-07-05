import React, { useState, useRef, useEffect, } from 'react';
import { View, TouchableOpacity, ScrollView, ImageBackground, Keyboard } from 'react-native';
import { Text, Button, Label, SmallIcon, Header } from '_atoms'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { Images } from '_utils'
import { useDispatch, useSelector } from "react-redux";
import { RtcEngine, AgoraView } from 'react-native-agora';
import {WSService} from '_utils';
import AgoraVideo from '../../agoraVideo/index';

import { Typography, Colors, Mixins, AppStyles } from '_styles';
import { ListEmptyComponent} from '_molecules'
import {
    getBookingRequest
  } from '../../../store/modules/booking/actions'
import {MyTopTabs} from '../'
let { boxShadow, padding, windowWidth, windowHeight } = Mixins

// Component 
const MyBooking = ({ navigation }) => {
    const dispatch = useDispatch()
    const [isVideo, setIsVideo] = useState(false);

    const { pastBooking=[], upcomingBooking=[]} = useSelector(state => ({
        pastBooking: state.bookingReducer.pastBooking,
        upcomingBooking: state.bookingReducer.upcomingBooking,
    }));
    // useEffect(() => {
    //     videoRequestFromDoctor();
    //     return () => {
    //       WSService.removeListener('customer_video_socket');
    //     };
    //   }, []);
    //   const videoRequestFromDoctor = () => {
    //     WSService.on('customer_video_socket', data => {
    //       if(data && data.orderId){
    //         let uid = Math.floor(Math.random() * 100)
    //         RtcEngine.joinChannel(data.orderId,uid);
    //         RtcEngine.enableAudio(); //Join Channel
    //         setIsVideo(true)
    //       }
    //     });
    //   };
    useEffect(() => {
        getBookings()
    }, [])
    /****************************** Api Function *************************************/
    const getBookings = () => {
          dispatch(getBookingRequest())
    }

    /****************************** Render Main  *************************************/
    return <View style={[{ flex: 1 }]}>
            <Header
            leftText
            image={Images.hamburgerBlack}
            style={[boxShadow('trasparent', {}, 0), padding(0,24,0,24)]}
            title={'My Appointments'}
            textColor={Colors.black}
            onPressLeft={()=> navigation.openDrawer()}
            textStyle={{ textAlign: 'center' }}
        />
        
        <MyTopTabs 
        pastBooking={pastBooking}
        upcomingBooking={upcomingBooking}
        />
    {/* <AgoraVideo isVideo={isVideo}/> */}
    </View>
}

export default MyBooking;