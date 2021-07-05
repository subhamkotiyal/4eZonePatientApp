import React, { useState, useRef, useEffect, } from 'react';
import { View, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';
import { Text, Button, Header, Card, SmallIcon } from '_atoms'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { Images } from '_utils'
import { Typography, Colors, Mixins, AppStyles } from '_styles';
let { padding, boxShadow, margin } = Mixins


export default ContactButton = () => {
    return <View style={[AppStyles.rowSpaceBetween]}>
            <View style={{ flex: 0.1 }} />

        {/****************  Card One  *********************/}
        <Card cardStyle={styles.cardStyle}>
            <View style={{ paddingBottom: 16 }}>
                <SmallIcon source={Images.emailgreen} style={styles.cardIcon}
                />
            </View>
            <Text h6 style={styles.cardText}>Email Us </Text>
        </Card>
        <View style={{ flex: 0.1 }} />

     {/****************  Card Two  *********************/}
        <Card cardStyle={[styles.cardStyle,padding(0)]}>
            <View style={{ paddingBottom: 16 }}>
                <SmallIcon source={Images.phonegreen} style={styles.cardIcon}/>
            </View>
            <View>
                <Text h6 
                style={styles.cardText}>Call Us </Text>
            </View>
        </Card>
        <View style={{ flex: 0.1 }} />
    </View>
}


const styles = StyleSheet.create({
    cardStyle : {
        ...padding(16, 0, 16, 0),
        ...margin(16, 0, 8, 0),
        ...boxShadow('black', { height: 1, width: 0 }, 10, 0.1),
            justifyContent: 'center', alignItems: 'center',
            borderRadius: moderateScale(6),
            flex: 0.32
    },
    cardIcon:{ height: moderateScale(28), width: moderateScale(28) },
    cardText :{ color: Colors.black, fontSize: Typography.normalize(18) }
})