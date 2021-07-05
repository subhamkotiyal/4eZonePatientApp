import React, { useState, useRef, useEffect, } from 'react';
import { View, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';
import { Text, Button, Header, Card, SmallIcon } from '_atoms'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { Images } from '_utils'
import { Typography, Colors, Mixins, AppStyles } from '_styles';
let { padding, boxShadow, margin } = Mixins
import {ContactButton} from '../templates'


// Component 
const Contact = ({ navigation }) => {

    return <View style={[{ flex: 1, backgroundColor: Colors.white }]}>
        <Header
            leftText
            image={Images.hamburger}
            onPressLeft={() => navigation.openDrawer()}
            style={[boxShadow('trasparent', {}, 0), padding(0)]}
            title={'Contact Us'}
            textStyle={{ textAlign: 'center' }}
        />
        <View style={[AppStyles.container,{paddingHorizontal: moderateScale(24), flex: 0.7,}]}>
            <View style={{justifyContent: 'center',flex: 0.8,}}>
                {/**************** Image View  *******************/}
                <View style={AppStyles.imageViewStyle}>
                    <Image source={Images.contact}
                        style={AppStyles.imageStyle}
                        resizeMode={'contain'} />
                </View>

                {/**************** Heading View  *******************/}
                <View style={AppStyles.headingView}>
                    <Text p style={AppStyles.textHeading}>How we can help?</Text>
                </View>
                <View style={AppStyles.subView}>
                <Text p style={AppStyles.contactText}>
                        Thanks for choosing BeeTrainer Pro Here. For Contact us please contact the mentioned details</Text>
                </View>
            </View>

        </View>
        {/**************** Contact Button  *******************/}
        <ContactButton />
    </View>
}

export default Contact;
