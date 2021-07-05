// src/components/Product.js
import React from 'react';
import { StyleSheet, TouchableOpacity, Image, View, ImageBackground } from 'react-native';
import { Mixins, Typography, Colors, AppStyles } from '_styles'
let { margin, boxShadow, scaleSize, padding, windowHeight, windowWidth } = Mixins
import { Text, Card, SmallIcon } from '_atoms'
import { Images } from '_utils'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'

//Addition Info
//Addition Info
const AdditinalInfo = ({rightTitle,leftImage,leftTitle}) => {
    return (
      <View style={[AppStyles.rowSpaceBetween, {paddingTop: moderateScale(10)}]}>
        <View style={{flex: 0.5, flexDirection: 'row'}}>
          <Image
            source={leftImage}
            style={{height: 18, width: 18}}
            resizeMode={'contain'}
          />
          <Text style={[styles.leftTitle]}>{leftTitle}</Text>
        </View>
        {rightTitle && <View style={styles.rightView}>
        <Text style={[styles.rightTitle]}>{'$300'}</Text>
  
        </View>}
      </View>
    );
  };
  export default AdditinalInfo
  
// Styles
const styles = StyleSheet.create({
    leftTitle: {
      color: 'rgba(0,0,0,0.5)',
      paddingLeft: moderateScale(12),
      fontSize: Typography.normalize(15),
    },
    rightTitle: {
      color: Colors.primary,
      fontSize: Typography.normalize(14),
    },
    rightView: {flex: 0.2, alignItems: 'flex-end'},
  });
  