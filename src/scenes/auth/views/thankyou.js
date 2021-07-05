import React, { useState, useRef, useEffect, } from 'react';
import { View, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';
import { Text, Button, Header } from '_atoms'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { Images } from '_utils'
import { Typography, Colors, Mixins, AppStyles } from '_styles';
import {  AuthButton } from '../templates';


// Component 
const Thankyou = ({ navigation }) => {


return <View style={[AppStyles.container,
    {paddingHorizontal:moderateScale(24)}]}>
     <View  style={{
          justifyContent:'center',
          flex:0.8
      }}>
    {/**************** Image View  *******************/}
        <View style={styles.imageViewStyle}>
        <Image source={Images.thankyou}  
        style={styles.imageStyle}
        resizeMode={'contain'} />
        </View>

     {/**************** Heading View  *******************/}
        <View style={styles.headingView}>
          <Text p  style={styles.textHeading}>Thank you</Text>
        </View>
         <View style={styles.subView}>
          <Text p  style={styles.text}>You have completed your registration successfully.Waiting for Admin`s Approval Once it will be approved you can login</Text>
        </View>
        </View>
    {/**************** Back To Login  *******************/}
        <View style={{
          justifyContent: 'center', 
          flex: 0.1,
        }}>
        <AuthButton
            title={'Back to login'}
            transparent={true}
            buttonTextStyle={{
            fontSize:Typography.normalize(20),
            color:Colors.lightGreen}}
            pressButton={() =>navigation.navigate('Login')}
          />
        </View>
    </View>
}

export default Thankyou;

const styles = StyleSheet.create({
    imageStyle:{
        width:'100%',
        height:'100%'
    },
    imageViewStyle:{
        height:scale(96),
        justifyContent:'center'
    },
    subView:{
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal:moderateScale(16)
    },
    headingView:{
        justifyContent:'center',
        alignItems:'center',
        paddingTop:moderateScale(24),
        paddingBottom:moderateScale(8),
    },
    text :{
        fontSize: Typography.normalize(16),
        textAlign: 'center',
        color: '#A8A8A8',
        lineHeight: 20
    },
    textHeading:{
        fontSize:Typography.normalize(24),
        fontWeight:'500',
        color:Colors.black
    }
})
