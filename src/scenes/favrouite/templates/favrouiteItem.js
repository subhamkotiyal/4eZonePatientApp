// src/components/Product.js
import React from 'react';
import { StyleSheet, TouchableOpacity, Image, View, ImageBackground } from 'react-native';
import { Mixins, Typography, Colors, AppStyles } from '_styles'
import LinearGradient from 'react-native-linear-gradient';

let { margin, boxShadow, scaleSize, padding, windowHeight, windowWidth } = Mixins
import { Text, Card, SmallIcon } from '_atoms'
import { Images,Methods } from '_utils'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
const {capitalize} = Methods


const FavrouiteItem = ({ item = {}, onPress, customeStyle, isSelectTrainer = false, onPressFevorite }) => (
    <Card cardStyle={[styles.cardStyle]}>
        {/*******************  Request Profile View  ******************/}
        <TouchableOpacity
            onPress={() => onPress && onPress()}
            style={[AppStyles.row, {
                paddingVertical: verticalScale(8)
            }]}>
            <View style={{
                flex: 0.34,
                borderRadius: moderateScale(85) / 8,
                marginHorizontal: 8,
                height: moderateScale(85),
                width: '100%',
            }}>
                <ImageBackground
                    imageStyle={{
                        borderRadius: moderateScale(85) / 8,
                        width: '100%'
                    }}
                    resizeMode='stretch'
                    style={{
                        flex: 1,
                        // alignSelf:'center',
                        width: undefined, height: undefined
                    }}
                    source={item && item.profileImage ? { uri: item.profileImage } : Images.notfound2}
                >
                    <LinearGradient
                        style={{
                            flex: 1, borderRadius: moderateScale(85) / 8,
                        }}
                        colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0.05)', 'rgba(0,0,0,0.1)']}
                    >

                    </LinearGradient>
                </ImageBackground>

            </View>

            <View style={[styles.leftSection]}>
                <Text h6 style={[styles.profileText, {
                    fontSize: Typography.normalize(18),
                    textTransform:'capitalize'

                }]}>{item.name ? item.name : ''}</Text>

                {<View style={AppStyles.row}>
                    <SmallIcon source={Images.address1}
                        style={styles.imageStyle} />
                    <Text p style={[styles.profileText, { paddingLeft: 4 }]}>{item.address ? item.address : ''}</Text>
                </View>
                }

                <View style={[AppStyles.column, { paddingTop: 2 }]}>
                    {/* <Text p style={[styles.profileText, { color: '#A1A1A1' }]}>{item.address ? item.address : ''}</Text> */}
                    <Text p style={[styles.profileText, { color: Colors.black }]}>
                    {item.services && item.services.length > 0 ?
                        item.services.toString() : ''}
                        {item.skills && item.skills.length > 0 ?
                            item.skills.toString() : ''}</Text>
                </View>
            </View>


            {/******* Right Status   **********/}
            <View style={styles.rightStatus}>
                <TouchableOpacity onPress={()=> onPressFevorite && onPressFevorite()}>
                <SmallIcon source={Images.heartround}
                    style={styles.deleteImageStyle} />
                </TouchableOpacity>
               
                <View style={{ paddingTop: moderateScale(12) }}>
                    <SmallIcon source={item.rating && item.rating > 0 ? Images.star : Images.star}
                        style={styles.ratingImageStyle} />
                    <Text h6 style={[styles.aratingText]}>{item.rating ? item.rating : '0.0'}</Text>

                </View>
            </View>
        </TouchableOpacity>


    </Card>
);
export default FavrouiteItem;

const styles = StyleSheet.create({
    cardStyle: {
        ...padding(0),
        ...margin(16, 16, 8, 16),
        ...boxShadow('black', { height: 1, width: 0 }, 1, 0.1),
        borderRadius: 16
    },
    profileText: {
        color: Colors.lightblack,
        fontSize: Typography.normalize(12),
    },
    aratingText: {
        color: Colors.black, alignSelf: 'center',
        paddingTop: moderateScale(8),
        fontSize: Typography.normalize(14),
    },
    profileStyle: { height: scale(72), width: scale(72) },
    imageStyle: { height: moderateScale(12), width: moderateScale(12) },
    deleteImageStyle: {
        borderRadius: moderateScale(28) / 2,
        height: moderateScale(28), width: moderateScale(28)
    },
    ratingImageStyle: {
        height: moderateScale(18), width: moderateScale(18)
    },
    leftSection: {
        flex: 0.8,
        justifyContent: 'center'
    },
    rightStatus: {
        flex: 0.2,
        paddingVertical: moderateScale(4)
    }
})
