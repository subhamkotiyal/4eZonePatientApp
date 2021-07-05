
import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Images } from '_utils'
import { useNavigation } from '@react-navigation/native';
import { Typography, Colors, Mixins, AppStyles } from '_styles';
import { scale } from 'react-native-size-matters';
let { padding } = Mixins

export default AuthHeader = ({leftIcon,logo}) => {
    const navigation = useNavigation();
    return <View style={[{ flex: 0.05 }]}>
        <View style={[AppStyles.rowSpaceBetween]}>
            {leftIcon && <TouchableOpacity
                style={{ flex: 0.25, alignItems: 'flex-start' }}
                hitSlop={{ top: 25, right: 25, left: 25, bottom: 25 }}
                onPress={() => navigation.goBack()}>
                <Image source={Images.ic_backwd_dark} style={{ alignSelf: 'flex-start' }} />
            </TouchableOpacity>
            }
            <View style={{ flex:1, alignItems: 'center'}}>
                <Image source={logo ? logo : Images.logo} 
                resizeMode={'contain'}
                style={{ alignSelf: 'center',height:scale(150),width:'100%' }} />
            </View>
        </View>
    </View>
}
