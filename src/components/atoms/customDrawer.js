
import React,{useEffect} from "react";
import { View, StyleSheet,Image,ImageBackground } from "react-native";
import LinearGradient from 'react-native-linear-gradient';

import { Mixins, Typography, Colors, AppStyles } from '_styles'
let { margin, boxShadow, scaleSize,windowHeight,windowWidth,  padding } = Mixins
import { Text, Card, SmallIcon } from '_atoms'
import { Images,Methods } from '_utils'
import { moderateScale, scale,verticalScale } from 'react-native-size-matters'
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { useSelector } from "react-redux";

const menuArray = [
    { name: 'Home', icon: Images.homeprofile, routeName: 'Home' },
    { name: 'My Appointment', icon: Images.myappointments, routeName: 'Bookings' },
    { name: 'Share by social', icon: Images.socail, routeName: 'Shares' },
    { name: 'Payment Method', icon: Images.wallet, routeName: 'Payments' },
    { name: 'Promotion', icon: Images.promotion, routeName: 'Coupons' },
    { name: 'Help & Support', icon: Images.support, routeName: 'Support' },
]
const {formatPhoneNumber} = Methods
const CustomDrawer = ({ navigation }) => {
    const { user } = useSelector(state => ({
        user: state.getProfileReducer.profileData,
    }));
   
   let phone = user && user.mobileNumber ? formatPhoneNumber(user.mobileNumber) :''
    return (
        <View style={{ flex: 1 }}>
            {/*********************** Profile Section  **********/}
            <ImageBackground
            source={Images.sidebar}
            style={{height:windowHeight/4.5}}
            >
                <View style={{ flex: 1,
                    paddingHorizontal:moderateScale(24),
                    paddingTop:16,
                    justifyContent: 'center' }}>
                    <TouchableOpacity
                    onPress={()=>navigation.navigate('Profile')}
                    style={{
                        borderRadius:  moderateScale(48)/2,
                        borderColor: 'white',
                        height: moderateScale(48), width: moderateScale(48),
                    }}>
                        <ImageBackground source={(user && user.profileImage && user.profileImage != 'none') ?
                            { uri: user.profileImage } : Images.dummyuser}
                            resizeMode={'cover'}
                            imageStyle={{ borderRadius: moderateScale(48)/2 }}
                            style={{
                                height: '100%', width: '100%',
                            }}
                        >
                            <LinearGradient
                                style={{ flex: 1, borderRadius: moderateScale(48)/2, }}
                                colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0.05)', 'rgba(0,0,0,0.1)']}
                            ></LinearGradient>
                        </ImageBackground>
                    </TouchableOpacity>
                    <View style={{ paddingVertical: moderateScale(8) }}>
                        <Text h6 style={styles.profileText}>{user && user.name ? user.name :'Victoria'}</Text>
                        <Text p style={styles.numberText}>{phone?phone:'987-889-8888'}</Text>
                    </View>
                </View>
            </ImageBackground>
           

            {/*********************** Menu Section  **********/}
            <ScrollView style={{
                flex: 1,
                paddingTop: moderateScale(20)
            }}>
                {menuArray.map((menu) => <TouchableOpacity
                    onPress={() => menu.routeName ? navigation.navigate(menu.routeName) : alert('Coming Soon')}
                    style={[AppStyles.row, padding(10, 0, 10, 0)]}>
                    <View style={{ flex: 0.25 }}>
                        <Image source={menu.icon}
                            style={{ height: scale(20), 
                            width: scale(20), alignSelf: 'center' }} />
                    </View>
                    <View style={{ flex: 0.8 }}>
                        <Text h6 style={styles.menuText}>{menu.name}</Text>
                    </View>
                </TouchableOpacity>)
                }
            </ScrollView>

        </View>
    );
};

export default CustomDrawer

const styles = StyleSheet.create({
    profileText: { color: Colors.black },
    imageStyle: {
        height: scale(48), width: scale(48),
        alignSelf: 'flex-start'
    },
    topContainer: {
        flex: 0.2, justifyContent: 'center',
        paddingHorizontal: moderateScale(24),
        paddingTop: moderateScale(24),
        //  paddingVertical: moderateScale(24),
       // backgroundColor: Colors.primary
    },
    menuText: {
        fontSize: Typography.normalize(16),
    },
    numberText: { color: Colors.black, fontWeight: '500' }
})
