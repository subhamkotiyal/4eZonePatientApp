// src/components/Product.js
import React from 'react';
import { StyleSheet, TouchableOpacity, Image, View, ImageBackground } from 'react-native';
import { Mixins, Typography, Colors, AppStyles } from '_styles'
let { margin, boxShadow, scaleSize, padding, windowHeight, windowWidth } = Mixins
import { Text, Card, SmallIcon } from '_atoms'
import { Images } from '_utils'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'


const AssignedDecline = ({assignedPress,declinePress,profileData,rejectRequest}) => (
            <View style={[AppStyles.rowSpaceBetween,
                {paddingVertical:verticalScale(8)}]}>
                 <View style={{flex:0.1}} />
                <TouchableOpacity 
                onPress={()=> assignedPress && assignedPress()}
                style ={styles.buttonAcceptView}>
                <Text h6 style={styles.buttonText}>
                Accept</Text>
                </TouchableOpacity>
                <View style={{flex:0.05}} />
                <TouchableOpacity 
                onPress={()=> rejectRequest && rejectRequest()}
                style ={styles.buttonDeclineView}>
                    <Text h6 style={[styles.buttonText,{
                        color:Colors.textColor
                    }]}>Decline</Text>
                </TouchableOpacity>
                <View style={{flex:0.05}} />

            </View>
);
export default AssignedDecline;

const styles = StyleSheet.create({
    buttonAcceptView:{
        borderRadius:moderateScale(16),
        paddingHorizontal:scale(16),
        justifyContent:'center',
        alignItems:'center',
        height:moderateScale(32),
        flex:0.4,
        backgroundColor:Colors.primary2,
    },
    buttonDeclineView:{
        borderRadius:moderateScale(16),
        paddingHorizontal:scale(16),
        justifyContent:'center',
        alignItems:'center',
        flex:0.3,   
        height:moderateScale(32),
        backgroundColor:Colors.lightGray,
    },
    buttonText:{
        color:Colors.white,
        paddingTop:3,
        fontSize:Typography.normalize(14)

    }
})
