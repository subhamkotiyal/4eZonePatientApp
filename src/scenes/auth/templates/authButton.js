
import React from 'react';
import { View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Typography, Colors, Mixins, AppStyles } from '_styles';
let { padding ,windowHeight} = Mixins
import { Button } from '_atoms'
import { verticalScale, moderateScale, scale } from 'react-native-size-matters';
export default AuthButton = ({title,transparent,pressButton,action,
  buttonStyle,buttonTextStyle}) => {
    return <Button
    buttonStyle={[{
      justifyContent: 'center',
      alignItems: 'center',
   
      borderColor: transparent ? Colors.primary : 'transparent',
      backgroundColor: transparent ? 'transparent' : Colors.primary,
    },buttonStyle && buttonStyle]}
    buttonTextStyle={[{ fontWeight: 'bold' },
    buttonTextStyle && buttonTextStyle]}
    fontSize={Typography.normalize(16)}
    color={transparent ? Colors.primary : '#FFFFFF'}
    onPress={() => pressButton(action)}
    title={title}
  />
}