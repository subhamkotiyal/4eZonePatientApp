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
import {Images} from '_utils';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

//Addition Info
const TimingInfo = ({rightTitle, leftImage, leftTitle}) => {
  return (
    <View style={[AppStyles.rowSpaceBetween, {paddingTop: moderateScale(6)}]}>
      <View style={{width: 18}} />
      <View style={{flex: 0.3, alignItems: 'center'}}>
        <Text style={[styles.leftTitle]}>{leftTitle}</Text>
      </View>
      <View style={styles.rightView}>
        <Text style={[styles.rightTitle]}>{rightTitle}</Text>
      </View>
      <View style={{width: 18}} />
    </View>
  );
};
export default TimingInfo;
// Styles
const styles = StyleSheet.create({
  leftTitle: {
    color: Colors.textColor,
    paddingLeft: moderateScale(12),
    fontSize: Typography.normalize(14),
  },
  rightTitle: {
    color: Colors.textColor,
    fontSize: Typography.normalize(14),
  },
  rightView: {flex: 0.8, alignItems: 'center'},
});
