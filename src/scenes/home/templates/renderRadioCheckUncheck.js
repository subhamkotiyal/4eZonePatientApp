import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import {Text, Button, Label, SmallIcon, Header} from '_atoms';
import {Line} from '_molecules';

import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {Images} from '_utils';
import {Typography, Colors, Mixins, AppStyles} from '_styles';

const RenderRadioCheckUncheck = ({
  leftvalue,
  rightvalue,
  leftTitle,
  rightTitle,
  value,
  onSelect,
}) => {
  return (
    <View
      style={[
        AppStyles.rowSpaceBetween,
        {flex: 1, paddingTop: moderateScale(10)},
      ]}>
      <TouchableOpacity
        onPress={() => onSelect(leftvalue)}
        style={[AppStyles.row, styles.rowend]}>
        <Text p style={[styles.textStyle]}>
          <SmallIcon
            source={value == leftvalue ? Images.radioactive : Images.radio}
            style={styles.imageStyle}
          />{' '}
          {leftTitle}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onSelect(rightvalue)}
        style={[AppStyles.row, styles.rowend]}>
        <Text p style={[styles.textStyle]}>
          <SmallIcon
            source={value == rightvalue ? Images.radioactive : Images.radio}
            style={styles.imageStyle}
          />{' '}
          {rightTitle}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RenderRadioCheckUncheck;

const styles = StyleSheet.create({
  leftTitle: {
    color: 'rgba(0,0,0,0.7)',
    fontSize: Typography.normalize(14),
  },
  rightTitle: {
    color: Colors.primary,
    fontSize: Typography.normalize(14),
  },
  imageStyle: {
    alignSelf: 'center',
    width: moderateScale(14),
    height: moderateScale(14),
    resizeMode: 'contain',
  },
  imageview: {},
  rowend: {flex: 0.5, alignItems: 'center'},
  textStyle: {
    fontSize: Typography.normalize(14),
    paddingHorizontal: 8,
    color: Colors.black,
  },
});
