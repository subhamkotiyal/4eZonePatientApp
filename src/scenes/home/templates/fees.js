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
const Fees = ({rightTitle,leftImage,leftTitle}) => {
  return (
    <View style={[AppStyles.rowSpaceBetween, {paddingTop: moderateScale(10)}]}>
      <View style={{flex: 0.5, flexDirection: 'row'}}>
        <View>
        <Image
          source={leftImage}
          style={{height: 18, width: 18}}
          resizeMode={'contain'}
        />
          </View>
        <Text h6 style={[styles.leftTitle]}>
          {leftTitle}
        </Text>
      </View>
      {rightTitle && (
        <View style={styles.rightView}>
          <Text h5 style={[styles.rightTitle]}>
            {`${rightTitle}`}
          </Text>
          <Text p style={[styles.regleftTitle]}>
            {'For regular consulation'}
          </Text>
        </View>
      )}
    </View>
  );
};
export default Fees;
// Styles
const styles = StyleSheet.create({
  leftTitle: {
    color: Colors.black,
    paddingLeft: moderateScale(8),
    fontSize: Typography.normalize(14),

  },
  rightTitle: {
    color: Colors.primary,
    lineHeight:20,
    fontSize: Typography.normalize(16),
  },
  regleftTitle: {
    color: Colors.textColor,
    fontSize: Typography.normalize(13),
  },
  rightView: {flex: 0.5, alignItems: 'center'},
});
