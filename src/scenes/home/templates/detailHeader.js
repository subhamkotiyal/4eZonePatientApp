import React from 'react';
import {View, TouchableOpacity, Image, ImageBackground} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {Text, Button, Card} from '_atoms';
import {Mixins, Colors} from '_styles';
const {windowWidth, windowHeight, boxShadow, padding} = Mixins;

import {Images} from '_utils';
import {moderateScale} from 'react-native-size-matters';
export default DetailHeader = props => {
  const navigation = useNavigation();
  const {onPressCart, onPressSelect, placeItem, item = {}} = props;
  return (
    <ImageBackground
      style={{
        width: '100%',
        flex: 1,
        height:
        windowHeight > 736 ? windowHeight / 2.5 : windowHeight / 2.75,
      }}
      imageStyle={{borderRadius: 2}}
      resizeMode={'cover'}
      source={Images.doctorImg}>
      <LinearGradient
        style={{flex: 1, borderRadius: 2}}
        colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.1)', 'rgba(0,0,0,0.5)']}>
        <View
          style={{
            flex: 0.3,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 16,
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            hitSlop={{top: 25, bottom: 25, left: 25, right: 25}}
            onPress={() => navigation.goBack()}
            style={[
              {
                flex: 0.2,
              },
            ]}>
            <Image
              source={Images.backwhite}
              resizeMode={'contain'}
              style={{
                height: moderateScale(18),
                width: moderateScale(18),
              }}
            />
          </TouchableOpacity>
          <View style={{flexDirection: 'row', flex: 0.8}}></View>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};
