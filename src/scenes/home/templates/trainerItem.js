// src/components/Product.js
import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  View,
  ImageBackground,
} from 'react-native';
import {Line, CustomeRating} from '_molecules';

import {Mixins, Typography, Colors, AppStyles} from '_styles';
let {margin, boxShadow, scaleSize, padding, windowHeight, windowWidth} = Mixins;
import {Text, Card, SmallIcon} from '_atoms';
import {Images} from '_utils';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';

const TrainerItem = ({
  item = {},
  onPressChat,
  onSelect,
  isRightIcon,
  hideRating,
  customeStyle,
  isFromBooking = false,
  onPressSelect,
  from,
}) => {
  console.log(item, 'doctor detail');
  return (
    <Card cardStyle={[styles.cardStyle]}>
      {/*******************  Request Profile View  ******************/}
      <View
        style={[
          AppStyles.row,
          {
            paddingVertical: verticalScale(6),
          },
        ]}>
        <View
          style={{
            flex: 0.25,
            height: scale(65),
            borderRadius: 12,
            width: scale(65),
          }}>
          <ImageBackground
            imageStyle={{borderRadius: 12}}
            resizeMode="cover"
            style={styles.profileStyle}
            source={
              item.doctorDetails &&
              item.doctorDetails.profileImage &&
              item.doctorDetails.profileImage != 'null'
                ? {uri: item.doctorDetails.profileImage}
                : Images.gail ||
                  (item.profileImage && item.profileImage != 'null')
                ? {uri: item.profileImage}
                : Images.gail
            }>
            <LinearGradient
              style={{
                flex: 1,
                borderRadius: 12,
              }}
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
                fontWeight: 'bold',
                fontSize: Typography.normalize(18),
              },
            ]}>{`${item.name || item.doctorName}`}</Text>
          <Text
            p
            style={[
              styles.subprofileText,
              {
                color: Colors.black,
              },
            ]}>
            {item.speciality && item.speciality[0]
              ? item.speciality[0].name
              : ''}
            {item.speciality && item.speciality.specialistName
              ? item.speciality.specialistName
              : ''}
            {item.doctorDetails && item.doctorDetails.speciality
              ? item.doctorDetails.speciality.specialistName
              : ''}
          </Text>
          <Text p style={[styles.subprofileText, {}]}>
            {`${
              item.doctorDetails && item.doctorDetails.exp
                ? item.doctorDetails.exp
                : item.exp
            } years overall experience`}
          </Text>
          {!hideRating && (
            <CustomeRating
              imageSize={16}
              defaultRating={item.avgRating}
              readOnly
            />
          )}
        </View>
        {/************************* Right Status   *******************/}
        {isRightIcon &&
        item.orderStatus == 'confirmed' ? (
          <TouchableOpacity
            onPress={() => onPressChat && onPressChat()}
            style={styles.rightStatus}>
            <SmallIcon source={isRightIcon} style={styles.deleteImageStyle} />
          </TouchableOpacity>
        ) : null}

        {from == 'gyms' ? (
          <TouchableOpacity
            hitSlop={{top: 25, bottom: 25, left: 25, right: 25}}
            onPress={() => onSelect && onSelect(item)}
            style={{flex: 0.1, justifyContent: 'center'}}>
            {item.isSelect ? (
              <SmallIcon
                source={Images.tick}
                style={{height: scale(28), width: scale(28)}}
              />
            ) : (
              <SmallIcon
                source={Images.unchecked}
                style={{height: scale(28), width: scale(28)}}
              />
            )}
          </TouchableOpacity>
        ) : null}
      </View>
    </Card>
  );
};
export default TrainerItem;

const styles = StyleSheet.create({
  cardStyle: {
    ...padding(0),
    ...margin(0, 0, 0, 0),
    ...boxShadow('black', {height: 1, width: 0}, 0, 0),
    borderRadius: 16,
  },
  profileText: {
    color: Colors.black,
    fontSize: Typography.normalize(14),
  },
  subprofileText: {
    color: Colors.lightblack,
    fontSize: Typography.normalize(14),
  },
  profileStyle: {
    borderRadius: 12,
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  imageStyle: {height: moderateScale(12), width: moderateScale(12)},
  deleteImageStyle: {
    height: moderateScale(32),
    borderRadius: moderateScale(32) / 2,
    width: moderateScale(32),
  },
  leftSection: {
    flex: 0.75,
    paddingHorizontal: 16,
    justifyContent: 'flex-start',
  },
  rightStatus: {
    flex: 0.2,
    justifyContent: 'flex-start',
  },
});
