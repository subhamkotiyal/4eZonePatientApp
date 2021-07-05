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
let {margin, boxShadow, scaleSize, padding, windowHeight, windowWidth} = Mixins;
import {Text, Card, SmallIcon} from '_atoms';
import moment from 'moment';
import {Images, Methods} from '_utils';
const {capitalize} = Methods;
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

const BookingItem = ({
  item = {},
  onPress,
  customeStyle,
  isCart,
  onPressSelect,
}) => {
  let address;
  if (item.additionalInfo) {
    let infoAddress = item.additionalInfo.split(',');
    address = infoAddress.length > 1 ? infoAddress[2] : '';
  }
  return (
    <Card
      cardStyle={[
        padding(0),
        margin(16, 16, 8, 16),
        boxShadow('black', {height: 2, width: 0}, 2, 0.4),
        {borderRadius: 8},
      ]}>
      {/*******************  Request Profile View  ******************/}
      <TouchableOpacity
        onPress={() => onPress && onPress()}
        style={[AppStyles.row, {paddingBottom: 8}]}>
        <View
          style={{
            flex: 0.35,
            paddingLeft: moderateScale(8),
            paddingTop:8,
            justifyContent:'center'
          }}>
          <Image
            source={item.doctorDetails && item.doctorDetails.speciality ? 
              {uri:item.doctorDetails.speciality.specialistImage} :Images.feicon}
            style={styles.feicon}
          />
        </View>
        <View style={[styles.leftSection]}>
          <Text
            h6
            style={[
              styles.profileText,
              {
                fontSize: Typography.normalize(16),
                textTransform: 'capitalize',
              },
            ]}>
            {`${item.doctorDetails && item.doctorDetails.speciality ? 
            item.doctorDetails.speciality.specialistName:''}`}
          </Text>
          <View style={[AppStyles.row]}>
            <Text
              p
              style={[
                styles.profileText,
                {
                  fontSize: Typography.normalize(14),
                },
              ]}>{`Type: ${item.bookingType }`}</Text>
          </View>
          <View style={[AppStyles.row, {paddingTop: 0}]}>
            <Text
              p
              style={[
                styles.profileText,
                {
                  color: 'rgba(0,0,0,0.5)',
                  fontSize: Typography.normalize(13),
                },
              ]}>{
                item.bookingType =='instant' ? 
                `${moment(item.orderRequestTime).format('lll')}`
                :
                `${moment(item.scheduleDate).format('ll')}, ${item.scheduleTime}`
              }</Text>
          </View>
        </View>
        {/******* Accept/Complted Status  **********/}
        <View style={styles.rightStatus}>
          <Text
            h6
            style={[
              styles.profileText,
              {
                color: 'white',
              },
            ]}>
            {`${item.orderStatus}`}
          </Text>
        </View>
      </TouchableOpacity>
    </Card>
  );
};
export default BookingItem;

const styles = StyleSheet.create({
  datetime: {color: Colors.white, alignSelf: 'center'},
  profileText: {
    color: Colors.black,
    fontSize: Typography.normalize(14),
  },
  imageStyle: {height: moderateScale(12), width: moderateScale(12)},
  leftSection: {
    paddingHorizontal: moderateScale(8),
    flex: 0.8,
    paddingTop: moderateScale(8),
    justifyContent: 'center',
  },
  feicon: {
    width: '100%',
    height: '100%',
    borderRadius:10
  },
  rightStatus: {
    height: moderateScale(24),
    backgroundColor: Colors.primary3,
    borderTopEndRadius: 8,
    borderBottomLeftRadius: 8,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
});
