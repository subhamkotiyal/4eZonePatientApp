import React, { useState, useRef, useEffect, } from 'react';
import { View, TouchableOpacity, FlatList, ImageBackground, Keyboard } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { Label } from '_atoms'
import { Typography, Colors, Mixins, AppStyles } from '_styles';
import { ListEmptyComponent, Line } from '_molecules'

import { TrainerItem } from '../templates';
let { boxShadow, padding, windowWidth, windowHeight } = Mixins


export default DetailTabItem = ({trainers,onSelect,from}) => {
    return <View style={{ flex: 1, backgroundColor: Colors.white }}>
        <View style={{ height: verticalScale(20) }} />

        <Label title={'About'}
            labelStyle={{ color: Colors.black }}
            subLabelStyle={{ fontSize: Typography.normalize(12) }}
            subTitle={`Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`}
            cardStyle={{ paddingHorizontal: moderateScale(16) }}
        />

        {/*************************** Line View  *******************/}

        <View style={{ height: verticalScale(8) }} />

        <View style={{ paddingHorizontal: 16 }}>
            <Line lineColor={'rgba(0, 0, 0, 0.05)'}
            />
        </View>
        <View style={{ height: verticalScale(16) }} />
        {/*************************** List View  *******************/}
        <Label title={'Our Trainers'}
            labeStyle={{ color: Colors.black }}
            cardStyle={{ paddingHorizontal: moderateScale(16) }}
        />
        <FlatList
            data={trainers}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => <ListEmptyComponent message={'No trainers found!'} />}
            renderItem={({ item, index }) => <TrainerItem
                item={item}
                index={index}
                onSelect={onSelect}
                from={from}
                onPress={() => null}
            />}
            style={{ backgroundColor: Colors.white }}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => 'store' + index}
        />
    </View>
}