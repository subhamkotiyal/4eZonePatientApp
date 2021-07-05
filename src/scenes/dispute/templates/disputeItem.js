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
import {Images} from '_utils';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

const DisputeItem = ({
  item = {},
  onPress,
  customeStyle,
  isSelectTrainer = false,
  onPressSelect,
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
          flex: 0.25,
          borderRadius: moderateScale(52) / 10,
          marginHorizontal: 8,
          height: moderateScale(52),
          width: '100%',
        }}>
        <ImageBackground
          imageStyle={{
            borderRadius: moderateScale(52) / 10,
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
            item &&
            item.gymId &&
            item.gymId.profileImage &&
            item.gymId.profileImage != 'null'
              ? {uri: item.gymId.profileImage}
              : Images.notfound2
          }>
          <LinearGradient
            style={{flex: 1, borderRadius: moderateScale(52) / 8}}
            colors={[
              'rgba(0,0,0,0.5)',
              'rgba(0,0,0,0.05)',
              'rgba(0,0,0,0.1)',
            ]}></LinearGradient>
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
          {item && item.gymId ? item.gymId.name : ''}
        </Text>

        {
          <View style={AppStyles.row}>
            <SmallIcon source={Images.address1} style={styles.imageStyle} />
            <Text p style={[styles.profileText, {paddingLeft: 4}]}>
              {item && item.gymId ? item.gymId.address : ''},
            </Text>
          </View>
        }
        <View style={[AppStyles.column, {paddingTop: 2}]}>
          <Text p style={[styles.profileText, {color: '#A1A1A1'}]}>
            {item && item.gymId ? item.gymId.address : ''}
          </Text>
        </View>
      </View>

      {/******* Right Status   **********/}
      <View style={styles.rightStatus}>
        <Text
          h6
          style={[
            styles.profileText,
            {
              fontSize: Typography.normalize(13),
            },
          ]}>{`$${
          item && item.bookingId ? item.bookingId.totalAccount : ''
        }`}</Text>
      </View>
    </TouchableOpacity>
  </Card>
);
export default DisputeItem;

const styles = StyleSheet.create({
  cardStyle: {
    ...padding(0),
    ...margin(16, 16, 8, 16),
    ...boxShadow('black', {height: 1, width: 0}, 1, 0.1),
    borderRadius: 16,
  },
  profileText: {
    color: Colors.lightblack,
    fontSize: Typography.normalize(12),
  },
  aratingText: {
    color: Colors.black,
    alignSelf: 'center',
    paddingTop: moderateScale(8),
    fontSize: Typography.normalize(14),
  },
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
    paddingHorizontal: moderateScale(8),
    justifyContent: 'center',
  },
  rightStatus: {
    height: moderateScale(24),
    backgroundColor: Colors.primary2,
    borderTopEndRadius: 8,
    borderBottomLeftRadius: 8,
    paddingTop: moderateScale(6),
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
});
