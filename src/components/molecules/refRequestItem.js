// src/components/Product.js
import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  View,
  ImageBackground,
} from 'react-native';
import {Mixins, Typography, Colors, AppStyles} from '_styles';
import moment from 'moment';

let {margin, boxShadow, scaleSize, padding, windowHeight, windowWidth} = Mixins;
import {Text, Card, SmallIcon} from '_atoms';
import {Images} from '_utils';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import AssignedDecline from './assignedDecline';

const returnDetail = (item) =>{
  let detail ={}
  if(item.chemistId){
    detail = item.chemistId
  }else if(item.hospitalId){
    detail = item.hospitalId
    detail['from']='Hospital'
  }else if(item.labAssistantId){
    detail = item.labAssistantId

  }else if(item.referalDoctorId){
    detail = item.referalDoctorId
  }else{
    detail = item.doctorDetails

  }
  return detail
}


const RefRequestItem = ({
  item = {},
  onPress,
  customeStyle,
  onPressProfile,
  assignedPress,
  profileData,
  rejectRequest,
}) => {
 let detail = returnDetail(item)
  return (
  <Card
    cardStyle={[
      padding(0),
      margin(16, 16, 8, 16),
      boxShadow('black',{height:1,width:1},6,0.1),
      {borderRadius: 16},
    ]}>
    {/*******************  Top View  ******************/}
    <View style={styles.topView}>
      <View>
        <Text p style={styles.topTitle}>{`Refer Request`}</Text>
      </View>
      <View style={[AppStyles.row]}>
        <Text h6 style={styles.datetime}>
        {`${moment(item.serviceDate).format('ll')}, ${item.scheduleTime}`}
        </Text>
      </View>
    </View>

    {/*******************  Request Profile View  ******************/}
    <View style={{height: scale(4)}} />
    <TouchableOpacity
    disabled
      style={[
        AppStyles.row,
        {
          paddingVertical: verticalScale(8),
          paddingHorizontal: moderateScale(8),
        },
      ]}>
      <View
        style={{
          flex: 0.25,
          height: scale(56),
          borderRadius: 8,
          width: scale(56),
        }}>
        <Image
          source={
            (detail &&
              detail.profileImage &&
              detail.profileImage != 'null')
              ? {
                  uri: detail.profileImage
                    ? detail.profileImage
                    : detail.profileImage,
                }
              : Images.notfound2
          }
          style={{height: '100%', borderRadius: 8, width: '100%'}}
        />
      </View>
      <View
        style={[
          AppStyles.column,
          {
            paddingHorizontal: moderateScale(12),
            flex: 1,
            justifyContent: 'center',
          },
        ]}>
        <Text h6 style={[styles.profileText,{

        }]}>
          {detail && detail.name?detail.name:'Mangal Test'}
        </Text>
        <Text
          p
          style={[
            styles.profileText,
            {
              fontSize: Typography.normalize(13),
            },
          ]}>
          {detail && detail.address?detail.address:'Sant Longowal Kundi'}
        </Text>
      </View>
    </TouchableOpacity>
    {/*******************  Accept/Decline  View  ******************/}
    <AssignedDecline
      rejectRequest={() => rejectRequest && rejectRequest()}
      assignedPress={assignedPress}
      profileData={profileData}
    />
    <View style={{height: scale(4)}} />
  </Card>
)};
export default RefRequestItem;

const styles = StyleSheet.create({
  topView: {
    backgroundColor: '#459DDC',
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'column',
  },
  datetime: {color: Colors.white,
  fontSize:Typography.normalize(16)
  },
  profileText: {color: Colors.black},

  topTitle: {color: Colors.white, fontSize: Typography.normalize(13)},
});
