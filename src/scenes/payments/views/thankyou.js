import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Platform,
  TouchableOpacity,
  StyleSheet,
  Image,
  BackHandler,
  ScrollView,
} from 'react-native';
import {Text, Button, Header, TextInput, SmallIcon} from '_atoms';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {Images} from '_utils';
import {Typography, Colors, Mixins, AppStyles} from '_styles';
let {padding, boxShadow, margin} = Mixins;
import { useDispatch, useSelector } from "react-redux";

import {CommonActions} from '@react-navigation/native';
import {useFocusEffect} from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';

// Component
const Thankyou = ({navigation, route}) => {
  const dispatch = useDispatch()
  const goBackScreen = () => {
    resetStack()
  };
  const resetStack = ()=>{
    setTimeout(()=>{
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            { name: 'Payments' },
          ],
        })
      );
    },100)
  }
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (route && route.name == 'ThankyouSuccess') navigation.navigate('Bookings');
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );
  return (
    <View style={[{flex: 1, backgroundColor: Colors.white}]}>
      <Header
        leftText
        image={Images.back}
        onPressLeft={() => goBackScreen()}
        style={[boxShadow('trasparent', {}, 0), padding(16)]}
        textStyle={{textAlign: 'center'}}
      />
      <ScrollView
            showsVerticalScrollIndicator={false}

        contentContainerStyle={[padding(16, 16, 0, 16)]}
        style={{backgroundColor: Colors.white, flex: 1}}>
        <View style={{height: verticalScale(72)}} />
        {/********************** Image View  *************************/}
        <View
          style={[
            {
              marginTop: moderateScale(48),
              flex: 1,
              justifyContent: 'center',
            },
          ]}>
          <View style={styles.imageViewStyle}>
            <Image
              source={Images.thankyou}
              style={styles.imageStyle}
              resizeMode={'contain'}
            />
          </View>
          {/**************** Heading View  *******************/}
          <View style={styles.headingView}>
            <Text h3 style={styles.textHeading}>
              Thank you
            </Text>
          </View>
          <View style={styles.subView}>
            <Text p style={styles.text}>
              Your booking has been succesfully placed with us
            </Text>
          </View>
        </View>
        <View style={{height: verticalScale(72)}} />

        <View>
          <Button
            title={'Go To Home'}
            buttonStyle={{borderRadius: 8, backgroundColor: 'transparent'}}
            onPress={() =>resetStack()
          }
            buttonTextStyle={{
              fontSize: Typography.normalize(20),
              color: Colors.primary3,
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Thankyou;

const styles = StyleSheet.create({
  imageStyle: {
    width: '100%',
    height: '100%',
  },
  imageViewStyle: {
    height: scale(96),
    justifyContent: 'center',
  },
  headingView: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: moderateScale(24),
    paddingBottom: moderateScale(0),
  },
  subView: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 4,
    paddingHorizontal: moderateScale(24),
  },
  text: {
    fontSize: Typography.normalize(16),
    textAlign: 'center',
    color: '#A8A8A8',
    lineHeight: 20,
  },
  textHeading: {
    // fontSize:Typography.normalize(24),
    fontWeight: 'bold',
    color: Colors.black,
  },
});
