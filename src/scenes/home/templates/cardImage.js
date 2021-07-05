 // src/components/Product.js
import React from 'react';
import { StyleSheet, TouchableOpacity, Image, View, ImageBackground } from 'react-native';
import { Mixins, Typography, Colors, AppStyles } from '_styles'
let { margin, boxShadow, scaleSize, padding, windowHeight, windowWidth } = Mixins
import { Text, Card, SmallIcon } from '_atoms'
import { Images } from '_utils'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'

 
 // Card Images
 const CardImage = ({item, index,onPress}) => {
    return (
      <TouchableOpacity 
      activeOpacity={0.9}
      style={{ flex: 0.5,
        backgroundColor: 'white',
    }}
      onPress={()=>onPress && onPress()}>
      <Card
        cardStyle={{
          ...boxShadow('black', {}, 2, 0.2),
          backgroundColor: 'white',
          flex: 0.3,
          marginHorizontal:12,
          marginVertical: 12,
          borderRadius: 8,
          alignItems: 'center',
        }}>
        <Image
          resizeMode={'contain'}
          style={{width: moderateScale(72), height: moderateScale(72)}}
          source={{
            uri:item.specialistImage
          }}
        />
        <Text h6
         style={{color: Colors.black, paddingTop: 8,
          fontSize: Typography.normalize(14),
        }}>
          {item.specialistName}
        </Text>
      </Card>
    </TouchableOpacity>
    );
  };

  export default CardImage