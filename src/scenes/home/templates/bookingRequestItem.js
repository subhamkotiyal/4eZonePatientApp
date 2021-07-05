// src/components/Product.js
import React from 'react';
import { StyleSheet, TouchableOpacity, Image, View, ImageBackground } from 'react-native';
import { Mixins, Typography, Colors, AppStyles } from '_styles'
let { margin, boxShadow, scaleSize, padding, windowHeight, windowWidth } = Mixins
import { Text, Card, SmallIcon } from '_atoms'
import { Images } from '_utils'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import AssignedDecline from './assignDeclineBtn'

const BookingRequestItem = ({ item = {}, onPress, customeStyle, onPressProfile,assignedPress }) => (
    <Card cardStyle={[padding(0),
    margin(16, 16, 8, 16),
    boxShadow('black',{height:1,width:0},1,0.1), { borderRadius: 16 }]}>
     
            {/*******************  Top View  ******************/}
            <View style={styles.topView}>
                <View>
                    <Text p style={styles.topTitle}>Booking Request</Text>
                </View>
                <View style={[AppStyles.row]}>
                    <View style={{ flex: 0.1, paddingRight:scale(4)}}>
                        <SmallIcon source={Images.clock}
                            style={{ height: scale(18), width: scale(18) }}
                        />
                    </View>
                    <Text h6 style={styles.datetime}>12 Jan 2020, 2:00 PM</Text></View>
            </View>

            {/*******************  Request Profile View  ******************/}
            <View style={{height:scale(4)}} />
            <TouchableOpacity 
            onPress={() => onPressProfile && onPressProfile()}
            style={[AppStyles.row,{
                paddingVertical:verticalScale(8)}]}>
                <View style={{ flex: 0.3, }}>
                    <SmallIcon source={Images.gail}
                        style={{ height: scale(56), width: scale(56) }}
                    />
                </View>
                <View style={[AppStyles.column,{
                    paddingHorizontal:moderateScale(8),
                    flex:1,
                    justifyContent:'center'}]}>
                    <Text h6 style={styles.profileText}>Gail Fircemind</Text>
                    <Text p style={[styles.profileText,{
                        fontSize: Typography.normalize(13)
                    }]}>Mind Body Burn,The ride</Text>
                </View>
            </TouchableOpacity>
            {/*******************  Accept/Decline  View  ******************/}
            <AssignedDecline 
                assignedPress={assignedPress}
            />
            <View style={{height:scale(4)}} />

    </Card>
);
export default BookingRequestItem;

const styles = StyleSheet.create({
    topView: {
        backgroundColor: Colors.primary2,
        borderTopRightRadius: 16,
        borderTopLeftRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 8,
        flexDirection: 'column',
    },
    datetime: { color: Colors.white, alignSelf: 'center' },
    profileText: { color: Colors.black },
   
    topTitle: { color: Colors.white, fontSize: Typography.normalize(13) },
   
})
