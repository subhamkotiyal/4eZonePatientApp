// src/components/Product.js
import React from 'react';
import { StyleSheet, TouchableOpacity, Image, View, ImageBackground } from 'react-native';
import { Mixins, Typography, Colors, AppStyles } from '_styles'
let { margin, boxShadow, scaleSize, padding, windowHeight, windowWidth } = Mixins
import { Text, Card, SmallIcon } from '_atoms'
import { Images } from '_utils'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'


const BookingDetail = ({ leftTitle, rightTitle }) => (
    <View style={[AppStyles.rowSpaceBetween, { flex: 1, paddingTop: moderateScale(10) }]} >
            <View style={{ flex: 0.5 }}>
                <Text p style={[AppStyles.medium,styles.leftTitle]}>
                    {leftTitle}
                </Text>
            </View>
            <View style={styles.rightView}>
                <Text p style={[AppStyles.medium,styles.rightTitle]}>
                    {rightTitle}
                </Text>
            </View>
        </View>
);
export default BookingDetail;


const styles = StyleSheet.create({
    leftTitle: {
        color: 'rgba(0,0,0,0.7)',
        fontSize: Typography.normalize(13)
    },
    rightTitle:{
        color: Colors.primary,
        fontSize: Typography.normalize(13)
    },
    rightView: { flex: 0.5, alignItems: 'flex-end' },

})
