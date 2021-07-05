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
import LinearGradient from 'react-native-linear-gradient';

let {margin, boxShadow, scaleSize, padding, windowHeight, windowWidth} = Mixins;
import {Text, Card, SmallIcon} from '_atoms';
import {Images, Methods} from '_utils';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

const {capitalize} = Methods;

const ListItem = ({
  item = {},
  onPress,
  customeStyle,
  isShowFavourite = false,
  onPressSelect,
  isTrainer = false,
}) => (
  <Card cardStyle={[styles.cardStyle]}>
    {/*******************  Request Profile View  ******************/}
    <TouchableOpacity
      onPress={() => onPress && onPress()}
      style={[
        AppStyles.row,
        {
          paddingVertical: verticalScale(8),
        },
      ]}>
      <View
        style={{
          flex: 0.34,
          borderRadius: moderateScale(82) / 8,
          marginHorizontal: 8,
          height: moderateScale(82),
          width: '100%',
        }}>
        <ImageBackground
          imageStyle={{
            borderRadius: moderateScale(82) / 8,
            width: '100%',
          }}
          resizeMode="cover"
          style={{
            flex: 1,
            // alignSelf:'center',
            width: undefined,
            height: undefined,
          }}
          source={
            item && item.profileImage && item.profileImage != 'null'
              ? {uri: item.profileImage}
              : Images.gail
          }>
          <LinearGradient
            style={{flex: 1, borderRadius: moderateScale(85) / 8}}
            colors={[
              'rgba(0,0,0,0.5)',
              'rgba(0,0,0,0.05)',
              'rgba(0,0,0,0.1)',
            ]}></LinearGradient>
        {item.doctorStatus == 'online' &&<View style={styles.imageAbsolute}>
            <Image
              source={Images.online}
              style={{height: moderateScale(16), width: moderateScale(16)}}
              resizeMode={'contain'}
            />
          </View>}
        </ImageBackground>
      </View>

      <View style={[styles.leftSection]}>
        <Text
          h6
          style={[
            styles.profileText,
            {
              fontSize: Typography.normalize(18),
              textTransform: 'capitalize',
            },
          ]}>
          {item.name ? item.name : 'Dr. Yatin Kukreja'}
        </Text>
        <Text p style={[styles.profileText]}>
          {item.speciality && item.speciality.length > 0  ? item.speciality[0].specialistName :'No Name'}
        </Text>
        <View style={[AppStyles.column, {paddingTop: 1}]}>
          <Text p style={[styles.profileText, {color: Colors.textColor}]}>
            {`${item.exp}  years overall experience`}
          </Text>
        </View>
      </View>

      {/******* Right Status   **********/}
      <View style={styles.rightStatus}>
        {isShowFavourite && (
          <SmallIcon
            source={Images.heartround}
            style={styles.deleteImageStyle}
          />
        )}
        <View style={{paddingTop: isShowFavourite ? moderateScale(12) : 0}}>
          <SmallIcon
            source={
              item.avgRating && item.avgRating > 0 ? Images.star : Images.star
            }
            style={styles.ratingImageStyle}
          />
          <Text h6 style={[styles.aratingText]}>
            {item.avgRating ? item.avgRating : '0.0'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  </Card>
);
export default ListItem;

const styles = StyleSheet.create({
  cardStyle: {
    ...padding(0),
    ...margin(8, 16, 8, 16),
    ...boxShadow('black', {height: 1, width: 1}, 1, 0.1),
    borderRadius: 16,
    backgroundColor:'white'
  },
  profileText: {
    color: Colors.black,
    fontSize: Typography.normalize(14),
  },
  aratingText: {
    color: Colors.black,
    alignSelf: 'center',
    paddingTop: moderateScale(8),
    fontSize: Typography.normalize(14),
  },
  imageAbsolute: {position: 'absolute', right: 0, bottom: 0},
  profileStyle: {height: scale(72), width: scale(72)},
  imageStyle: {height: moderateScale(12), width: moderateScale(12)},
  deleteImageStyle: {
    borderRadius: moderateScale(28) / 2,
    height: moderateScale(28),
    width: moderateScale(28),
  },
  ratingImageStyle: {
    height: moderateScale(18),
    width: moderateScale(18),
  },
  leftSection: {
    flex: 0.8,
    paddingLeft: 4,
    justifyContent: 'flex-start',
  },
  rightStatus: {
    flex: 0.2,
    paddingVertical: moderateScale(4),
  },
});
