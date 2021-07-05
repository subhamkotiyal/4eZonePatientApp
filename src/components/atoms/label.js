import React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {Text, Card} from '_atoms';
import {AppStyles, Typography,Colors, Mixins} from '_styles';
import {moderateScale} from 'react-native-size-matters';
let {boxShadow} = Mixins;
import {Images} from '_utils';

const Label = ({
  title,
  leftImage,
  cardStyle,
  image,
  labelStyle,
  subTitle,
  subLabelStyle,
}) => {
  return (
    <View style={cardStyle && cardStyle}>
      <View style={[AppStyles.rowSpaceBetween]}>
        <Text h6 style={[{color: 'rgba(0,0,0,0.9)',
      fontSize:Typography.normalize(16)
      }, labelStyle && labelStyle]}>
          {leftImage && (
            <Image
              source={leftImage}
              resizeMode={'contain'}
              style={{height: moderateScale(16),
                width: moderateScale(16)}}
            />
          )}
          {leftImage?`  `:''} {title}
        </Text>
      </View>

      {subTitle && (
        <View style={[AppStyles.rowSpaceBetween]}>
          <Text
            p
            style={[
              {color: 'rgba(0,0,0,0.7)',
            
              fontSize:Typography.normalize(13)

            },
              subLabelStyle && subLabelStyle,
            ]}>
            {subTitle}
          </Text>
        </View>
      )}
    </View>
  );
};

export default Label;
