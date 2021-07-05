import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Keyboard,
} from 'react-native';
import moment from 'moment';
import { RtcEngine, AgoraView } from 'react-native-agora';

import {Text, Button, Label, SmallIcon, Header} from '_atoms';
import {Line} from '_molecules';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {Images,Methods} from '_utils';
import {Typography, Colors, Mixins, AppStyles} from '_styles';
import {MyTopTabs} from '../';
let {boxShadow, padding, windowWidth, windowHeight} = Mixins;
import {Request} from '_services';
import Config, {SUCCESS} from '_utils/constants/apiConstant';
import AgoraVideo from '../../agoraVideo/index';
import {WSService} from '_utils';

import {DetailItem, DetailHeader, TrainerItem} from '../../home/templates';
// Component
const BookingDetail = ({navigation, route}) => {
  const {from, itemDetail} = route.params;
  const [item, setItem] = useState(itemDetail);
  const [isVideo, setIsVideo] = useState(false);

  const [loader, setLoader] = useState(false);
  
 
  /****************************** Function Main  *************************************/
   const liveFeedAction = async () => {
     let {_id,doctorId} = item
     let {showToast} = Methods;

     if(_id){
      try {
        let data= {}
        data['doctorId']=doctorId
        data['orderId']=_id
        let videoData = await Request.post(`${Config.startVideocalling}`,data);
        if (videoData.status === SUCCESS) {
          if(videoData.data.doctorStatus == 'Online'){
            let uid = Math.floor(Math.random() * 100)
            RtcEngine.joinChannel(_id,uid);
            RtcEngine.enableAudio(); //Join Channel
            setIsVideo(true)
          }else{
            showToast('Doctor is offline', 'danger');
          }
         
        }
      } catch (err) {
        console.log(err.message, 'Error in fav');
      }
     }
   }
   const endCall = () =>{
    RtcEngine.leaveChannel();
    setIsVideo(false)

   }
/****************************** Render Child  *************************************/
  const Line = () => {
    return (
      <View
        style={{
          height: moderateScale(1),
          backgroundColor: Colors.borderColor,
          marginTop: moderateScale(2),
        }}
      />
    );
  };
  /****************************** Render Main  *************************************/
  return (
    <View style={[{flex: 1, backgroundColor: 'white'}]}>
      <ScrollView
        showsVerticalScrollIndicator={false}

        style={{backgroundColor: 'white', paddingHorizontal: moderateScale(16)}}
        keyboardShouldPersistTaps={'never'}>
        <Header
          leftText
          image={Images.back}
          style={[
            boxShadow('trasparent', {height: 0, width: 0}, 0, 0),
            padding(0),
            {},
          ]}
          title={'Appointment details'}
          textColor={Colors.black}
          textStyle={{textAlign: 'center'}}
        />
        <View
          style={{
            marginTop: moderateScale(8),
            backgroundColor: 'white',
          }}></View>
        <View style={{height: verticalScale(8)}} />

        <DetailItem
          item={item}
          isFromBooking
        />
        <View style={{height: verticalScale(8)}} />

        <Line />
        <View style={{height: verticalScale(8)}} />
        <Label
          title={'Date and Time '}
          subTitle={
            item.bookingType =='instant' ? 
            `${moment(item.orderRequestTime).format('lll')}`
            :
            `${moment(item.scheduleDate).format('ll')}, ${item.scheduleTime}`
          }
          subLabelStyle={{
            color: Colors.black,
            fontSize: Typography.normalize(14),
          }}
          labelStyle={{
            color: 'rgba(0,0,0,0.2)',
            fontSize: Typography.normalize(13),
          }}
        />
        <View style={{height: verticalScale(8)}} />
        <Line />

       {/* /****************** Doctor Alloted *****************/}
        <View style={{height: verticalScale(24)}} />
        <Label
          title={'Alloted Doctor '}
          labeStyle={{color: 'rgba(0,0,0,0.7)'}}
        />
        <TrainerItem 
        item={item}
        hideRating
        isRightIcon={Images.chat}
        onPressChat={()=> liveFeedAction()}
        isFromBooking={from == 'Upcoming' ? true : false} />
        <View style={{height: verticalScale(8)}} />
        <Line />
        <View style={{height: verticalScale(12)}} />
        <Label
          title={'Doctor Details'}
          subTitle={`${item.doctorName}, ${item.doctorDetails&&item.doctorDetails.speciality ? item.doctorDetails.speciality.specialistName:''}`}
          subLabelStyle={{
            color: Colors.black,
            fontSize: Typography.normalize(14),
          }}
          labelStyle={{
            color: 'rgba(0,0,0,0.2)',
            fontSize: Typography.normalize(13),
          }}
        />
        <View style={{height: verticalScale(12)}} />
        <Line />

        <View style={{height: verticalScale(48)}} />
     
      </ScrollView>
     
      {/*******************  Trainer Upcoming Button  ******************/}
      {from == 'Upcoming' && (
        <View
          style={{
            justifyContent: 'center',
            marginVertical: moderateScale(48),
            paddingHorizontal: moderateScale(16),
            flex: 1,
          }}>
          <Button
            disabled
            title={item.orderStatus ?item.orderStatus.toUpperCase():'' }
          />
        </View>
      )}
      {/*******************  Trainer Pasr Button  ******************/}
      {from == 'Past' && !loader && (
        <View
          style={{
            marginVertical: moderateScale(48),
            justifyContent: 'space-between',
            paddingHorizontal: moderateScale(16),
          }}>
          {item.review && !item.review.CSubAt && item.orderStatus == 'completed'? (
            <View style={{flex: 1}}>
              <Button
                onPress={() =>
                  navigation.navigate('Rating', {
                    itemDetail: item,
                  })
                }
                title={'Rating'}
                buttonTextStyle={{fontWight: 'bold'}}
              />
            </View>
          ) : null}
        </View>
      )}
        <View style={{height: 8}} />
       <AgoraVideo 
       endCall={endCall}
       isVideo={isVideo}/>
    </View>
  );
};

export default BookingDetail;
