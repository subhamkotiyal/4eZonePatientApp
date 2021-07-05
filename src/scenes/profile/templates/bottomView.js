
import React, { useState, useRef, useEffect, } from 'react';
import { View,StyleSheet,TouchableOpacity } from 'react-native';
import { Text, SmallIcon, Header } from '_atoms'
import { Images } from '_utils'
import { Typography, Colors, Mixins, AppStyles } from '_styles';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'


const BottomView = ({onPressLeft,onPressRight}) => {
    return <View style={[AppStyles.rowSpaceBetween,styles.container]}>
        <View style={{ flex: 0.01 }} />
        <TouchableOpacity style={styles.changePwdBtn} 
        onPress={() => onPressLeft && onPressLeft()}>
            <Text h6 style={{ color: Colors.primary, 
                fontSize: Typography.normalize(12) }}>Change Password</Text>
        </TouchableOpacity>
        <View style={{ flex: 0.2 }} />
        <TouchableOpacity 
        onPress={() => onPressRight && onPressRight()}
        style={styles.logoutrow}>
            <View style={{ flex: 0.2 }}>
                <SmallIcon source={Images.logout}
                    style={{ height: scale(18), width: scale(18) }} />
            </View>
            <View style={{ paddingLeft: 8 }}>
                <Text h6 style={{ color: '#DF5C48' }}>Logout</Text>
            </View>

        </TouchableOpacity>
    </View>

}
export default BottomView

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 16,
        paddingHorizontal: moderateScale(16), justifyContent: 'center'
    },
    changePwdBtn:{
        flex: 0.4,
        borderColor: Colors.primary,
        borderWidth: 2,
        height: moderateScale(32),
        borderRadius: 4,
        justifyContent: 'center', alignItems: 'center'
    },
    logoutrow:{
        flex: 0.4, justifyContent: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center'
    }
})
