// src/components/Product.js
import React from 'react';
import { StyleSheet, TouchableOpacity, Image, View, ImageBackground } from 'react-native';
import { Mixins, Typography, Colors, AppStyles } from '_styles'
let { margin, boxShadow, scaleSize, padding, windowHeight, windowWidth } = Mixins
import { Text, Card, SmallIcon } from '_atoms'
import { Images } from '_utils'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import moment from 'moment'

const IssueItem = ({ item = {}, onPress, customeStyle, appointment=false, onPressSelect }) => (
    <Card cardStyle={[styles.cardStyle]}>
         <TouchableOpacity
        onPress={()=> null}
        style={[AppStyles.row,{paddingVertical:verticalScale(8)}]}>
            <View style={{ flex: 0.2, 
                height: scale(42), width: scale(42),borderRadius:scale(42)/4}}>
                <Image source={ item && item.image ? { uri:item.image } : Images.notfound2}
                    style={{ height: scale(42), width: scale(42),borderRadius:4, }}
                />
            </View>

            <View style={[AppStyles.leftSection]}>
                <Text h6 style={[styles.profileText, {
                fontSize: Typography.normalize(14),
                }]}>{item && item.name ? item.name :''}</Text>
            <View style={[AppStyles.column,{paddingTop:moderateScale(2)}]}>
                <Text p style={[styles.profileText,{
                    fontSize: Typography.normalize(12),
                    color:'#A1A1A1'}]}>{item && item.createdAt ? moment(item.createdAt).format('lll') :'' }</Text>
            </View>
                
                {/***********Description   **************/}
            <View style={[AppStyles.column,{paddingTop:moderateScale(6)}]}>
            <Text p style={[styles.desText]}>{item && item.description ?item.description :''}</Text>
            </View>      
         </View>    
           
        </TouchableOpacity>  
        </Card>
);
export default IssueItem;

const styles = StyleSheet.create({
    cardStyle:{
        ...padding(0,0),
        ...margin(8, 0, 8, 0),
        ...boxShadow('black', { height: 1, width: 0 }, 0.6, 0.1),
         borderRadius: moderateScale(0) ,
         backgroundColor:'white'
    },
    profileText: {
        color: Colors.black,
        fontSize: Typography.normalize(14),
    },
    desText:  {
    fontSize: Typography.normalize(12),
        color:'#A1A1A1',
    lineHeight:16,},
    
})
