// src/components/Product.js
import React from 'react';
import { StyleSheet, TouchableOpacity, Image, View, ImageBackground } from 'react-native';
import { Mixins, Typography, Colors, AppStyles } from '_styles'
let { margin, boxShadow, scaleSize, padding, windowHeight, windowWidth } = Mixins
import { Text, Card, SmallIcon } from '_atoms'
import { Images } from '_utils'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'


const PaymentsItem = ({ item = {}, onPress, customeStyle,
    disabled=false,
    appointment = false, onPressSelect }) => (
    <Card cardStyle={[styles.cardStyle, customeStyle && customeStyle]}>

     {/*******************  Request Profile View  ******************/}
        <TouchableOpacity 
        disabled={disabled}
        onPress={()=> onPress && onPress()}
        style={[AppStyles.row, {
            paddingVertical: verticalScale(4)
        }]}>
            <View style={{ flex: 0.22,justifyContent:'flex-end' }}>
                <SmallIcon source={item.logo ?{uri:item.logo} :Images.visa}
                    style={styles.leftImageStyle}
                />
            </View>
            <View style={[styles.leftSection]}>
                <Text h6 style={[styles.profileText, {
                    fontSize: Typography.normalize(16),
                }]}>{item.type == 'Cash' ?item.type :item.lastd}</Text>
            </View>
        </TouchableOpacity>
    </Card>
);
export default PaymentsItem;

const styles = StyleSheet.create({
    datetime: { color: Colors.white, alignSelf: 'center' },
    cardStyle: {
        ...padding(0),
        ...margin(16, 16, 8, 16),
        ...boxShadow('black', { height: 1, width: 0 }, 5, 0.05),
        borderRadius: moderateScale(8)
    },
    profileText: {
        color: Colors.lightblack,
        fontSize: Typography.normalize(14),
    },
    imageStyle: { height: moderateScale(12), width: moderateScale(12) },
    leftSection: {
        flex: 0.7,
        paddingLeft:moderateScale(2),
        justifyContent: 'center',
        paddingTop:moderateScale(4)
    },
    rightStatus: {
        alignItems: 'flex-end',
        paddingHorizontal:moderateScale(4),
        flex: 0.1,
    },
    leftImageStyle:{ height: scale(42), width: scale(42) }
})
