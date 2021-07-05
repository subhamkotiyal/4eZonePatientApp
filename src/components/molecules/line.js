
import React from 'react';
import {
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    Image,
} from 'react-native';
import { verticalScale, moderateScale, scale } from 'react-native-size-matters';

import {AppStyles,Mixins,Colors} from '_styles';

export default Line = ({lineColor=Colors.borderColor}) => {
    return  <View style={{ height: moderateScale(1), backgroundColor: lineColor, marginTop: moderateScale(2) }} />
}