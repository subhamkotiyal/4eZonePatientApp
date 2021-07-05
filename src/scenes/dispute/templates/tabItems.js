import React, { useState, useRef, useEffect, } from 'react';
import { View, TouchableOpacity, FlatList, ImageBackground, Keyboard } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { Typography, Colors, Mixins, AppStyles } from '_styles';
import { ListEmptyComponent} from '_molecules'

import  DisputeItem  from './disputeItem';
import { useNavigation } from '@react-navigation/core';
let { boxShadow, padding, windowWidth, windowHeight } = Mixins


export default  TabItem = ({data}) => {
  const navigation = useNavigation()
return <FlatList
data={data}
showsVerticalScrollIndicator={false}
ListEmptyComponent={()=> <ListEmptyComponent message={'No dispute found!'}/>}
renderItem={({item,index}) => <DisputeItem 
  item={item}
  onPress={()=>navigation.navigate('Claim',{
    itemDetail:item
  })}
  index={index}
/>}
style={{backgroundColor: Colors.white}}
showsHorizontalScrollIndicator={false}
keyExtractor={(item, index) => 'store' + index}
/>
}