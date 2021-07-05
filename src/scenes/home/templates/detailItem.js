// src/components/Product.js
import React from 'react';
import { StyleSheet, TouchableOpacity, Image, View, ImageBackground } from 'react-native';
import { Mixins, Typography, Colors, AppStyles } from '_styles'
import LinearGradient from 'react-native-linear-gradient';
import { CustomeRating } from '_molecules'
import moment from 'moment'
let { margin, boxShadow, scaleSize, padding, windowHeight, windowWidth } = Mixins
import { Text, Card, SmallIcon } from '_atoms'
import { Images } from '_utils'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'

const DetailItem = ({ item = {}, onPress, customeStyle,isFromBooking=false,from,
    isShowFavourite = false, onPressFevorite }) => {
       return  <View
        style={[AppStyles.row, {paddingBottom: 8}]}>
        <View
          style={{
            width: moderateScale(72),
            height: moderateScale(72),
            borderRadius:8,

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
            {`${item.doctorDetails && item.doctorDetails.speciality ? item.doctorDetails.speciality.specialistName:''}`}
          </Text>
          <View style={[AppStyles.row]}>
            <Text
              p
              style={[
                styles.profileText,
                {
                  fontSize: Typography.normalize(14),
                },
              ]}>{`Type: ${item.bookingType}`}</Text>
          </View>
 
        </View>
        </View>
    };
export default DetailItem;



const styles = StyleSheet.create({
    cardStyle: {
        ...padding(0, 16, 0, 16),
        ...margin(0),
        ...boxShadow('black', { height: 1, width: 0 }, 1, 0.1),
        borderRadius: 0
    },
    profileText: {
        color: Colors.black,
        fontSize: Typography.normalize(12),
    },
    feicon: {
        width: '100%',
        height: '100%',
        borderRadius:8,

      },
    aratingText: {
        color: Colors.textColor, alignSelf: 'center',
        paddingTop: moderateScale(8),
        fontSize: Typography.normalize(15),
    },
    profileStyle: { height: scale(72), width: scale(72) },
    imageStyle: { height: moderateScale(12), width: moderateScale(12) },
    deleteImageStyle: {
        borderRadius: moderateScale(32) / 2,
        height: moderateScale(32), width: moderateScale(32)
    },
    ratingImageStyle: {
        height: moderateScale(16), width: moderateScale(16)
    },
    leftSection: {
        flex: 0.8,
        paddingHorizontal:moderateScale(8),
        paddingTop:moderateScale(8)
        // justifyContent: 'center'
    },
    rightStatus: {
        flex: 0.2,
        alignItems:'flex-end',
        paddingVertical: moderateScale(4)
    }
})
