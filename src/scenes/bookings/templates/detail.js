// src/components/Product.js
import React from 'react';
import { StyleSheet, TouchableOpacity, Image, View, ImageBackground } from 'react-native';
import { Mixins, Typography, Colors, AppStyles } from '_styles'
let { margin, boxShadow, scaleSize, padding, windowHeight, windowWidth } = Mixins
import { Text, Card, SmallIcon } from '_atoms'
import { Images } from '_utils'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'


const Detail = ({ leftTitle, rightTitle }) => (
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
export default Detail;


const styles = StyleSheet.create({
    leftTitle: {
        color: 'rgba(0,0,0,0.7)',
        fontSize: Typography.normalize(14)
    },
    rightTitle:{
        color: Colors.primary,
        fontSize: Typography.normalize(14)
    },
    rightView: { flex: 0.5, alignItems: 'flex-end' },

})
