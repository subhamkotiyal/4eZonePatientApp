
import React from 'react';
import {
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    Image,
} from 'react-native';
import { Mixins, Colors, AppStyles, Typography } from '_styles'
import { verticalScale, moderateScale, scale } from 'react-native-size-matters';

export default  BottomAbsoluteButton = ({image,onPress,customeStyle})=>{
    return <TouchableOpacity 
    onPress={()=> onPress && onPress()}
    style={[{
    height:moderateScale(48),width:moderateScale(48),
    position:'absolute',bottom:32,right:moderateScale(16),
    justifyContent:'center',
    zIndex:1000,
    borderRadius:moderateScale(48)/2,
    backgroundColor:Colors.primary},customeStyle && customeStyle]}>
     <Image source={image}
     resizeMode={'contain'}
      style={{alignSelf:'center',width:'100%',
      height:48}}/>
    </TouchableOpacity>
}