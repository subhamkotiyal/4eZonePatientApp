import React, { useState, useRef, useEffect, } from 'react';
import { View, TouchableOpacity, FlatList, ImageBackground, Keyboard } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { Label } from '_atoms'
import { Typography, Colors, Mixins, AppStyles } from '_styles';
import { ListEmptyComponent } from '_molecules'

import { ServiceItem } from '../templates';
let { boxShadow, padding, windowWidth, windowHeight } = Mixins


export default SessionTabItem = ({sessions,onSelect}) => {
    return <View style={{ flex: 1, backgroundColor: Colors.white }}>
        <View style={{ height: verticalScale(16) }} />
        <Label title={'Workout Session'}
            labeStyle={{ color: Colors.black }}
            cardStyle={{ paddingHorizontal: moderateScale(16) }}
        />
        <FlatList
            data={sessions}
            showsVerticalScrollIndicator={false}
            extraData={sessions}
            ListEmptyComponent={() => <ListEmptyComponent message={'No services found!'} />}
            renderItem={({ item, index }) => <ServiceItem
                item={item}
                index={index}
                onSelect={onSelect}
                onPress={() => null}
            />}
            style={{ backgroundColor: Colors.white }}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => 'store' + index}
        />
    </View>
}