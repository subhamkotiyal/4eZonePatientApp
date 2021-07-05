
import React, { useState, useRef, useEffect, } from 'react';
import { View, TouchableOpacity, ScrollView, TextInput,ImageBackground, StyleSheet } from 'react-native';
import { Text, Button, Label, SmallIcon, Header } from '_atoms'
import { Line } from '_molecules'
import moment from 'moment';

import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { Images } from '_utils'
import { Typography, Colors, Mixins, AppStyles } from '_styles';

let { boxShadow, padding, windowWidth, windowHeight } = Mixins


const DateTimeServices = ({showDateTimepicker,onChange,date}) => {
    return <View style={[AppStyles.column, {
        marginTop: verticalScale(8)
    }]}>
        <TouchableOpacity 
        onPress={()=>showDateTimepicker('date')}
        style={[styles.btnView]}>
            <Text style={[styles.dateTimeText]}>
                Date
        </Text>
            <Text h5 style={[styles.text]}>
            {moment(date).format('ll')}
        </Text>
        </TouchableOpacity>
        <TouchableOpacity 
        onPress={()=>showDateTimepicker('time')}
        style={[styles.btnView,{
            marginTop: verticalScale(16)

        }]}>
        <Text style={[styles.dateTimeText]}>
            Time
        </Text>
        <Text h5 style={[styles.text]}>
         {moment(date).format('hh:mm A')}
        </Text>
        </TouchableOpacity>
    </View>
}
export default DateTimeServices
const styles = StyleSheet.create({
    btnView: {
        ...boxShadow('black', {height:1,width:0}, 2,0.2),
        backgroundColor: 'white',
        paddingVertical: moderateScale(2),
        paddingHorizontal: moderateScale(16),
        flex: 0.3,


    },
    text: {
        color: 'rgba(0,0,0,1)',
        fontSize: Typography.normalize(12)
    },
    dateTimeText: {
        color: Colors.primary,
        fontSize: Typography.normalize(12)
    }
})