import React, {useState, useRef, useEffect} from 'react';
import {View, TouchableOpacity, ImageBackground} from 'react-native';
import {Text, Button, TextInput, SmallIcon, Header} from '_atoms';
import LinearGradient from 'react-native-linear-gradient';

import {Images} from '_utils';
import {Typography, Colors, Mixins, AppStyles} from '_styles';
import {moderateScale} from 'react-native-size-matters';
let {boxShadow, padding, windowWidth, windowHeight} = Mixins;

const ProfileView = ({
  nameStyle,
  mainStyle,
  user = {},
  onOpenImage,
  fromEdit,
}) => {
  console.log(user, 'user');
  return (
    <View
      style={[
        {
          alignItems: 'center',
          alignSelf: 'center',
          position: 'absolute',
          top: windowHeight/5.5,
          zIndex: 1000,
          overflow: 'visible',
          // marginTop: windowHeight / 10,
          justifyContent: 'center',
          backgroundColor: 'transparent',
        },
        mainStyle && mainStyle,
      ]}>
      <View
        style={{
          borderRadius: 16,
          borderColor: 'white',
          height: moderateScale(96),
          width: moderateScale(96),
        }}>
        <ImageBackground
          source={
            user.profileImage && user.profileImage != 'none'
              ? {uri: user.profileImage}
              : Images.notfound2
          }
          resizeMode={'cover'}
          imageStyle={{borderRadius: 16}}
          style={{
            borderRadius: 2,
            height: '100%',
            width: '100%',
          }}>
          <LinearGradient
            style={{flex: 1, borderRadius: 16}}
            colors={[
              'rgba(0,0,0,0.5)',
              'rgba(0,0,0,0.05)',
              'rgba(0,0,0,0.1)',
            ]}></LinearGradient>
        </ImageBackground>
      </View>

      {!fromEdit && (
        <View style={{paddingTop: 8}}>
          <Text h6 style={[AppStyles.topTitle, nameStyle && nameStyle]}>
            {user.name ? user.name : 'Mangal Singh'}{' '}
          </Text>
        </View>
      )}
      {fromEdit && (
        <TouchableOpacity
          hitSlop={{right: 50, left: 50, top: 50, bottom: 50}}
          onPress={() => onOpenImage && onOpenImage()}
          style={{
            position: 'absolute',
            top: moderateScale(96) - 22,
            right: moderateScale(96) - 90,
          }}>
          <SmallIcon
            source={Images.camera}
            style={{
              height: moderateScale(18),
              width: moderateScale(18),
            }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};
export default ProfileView;
