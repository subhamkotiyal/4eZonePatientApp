import React from "react";
import { TouchableOpacity, Image, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import { Text } from "_atoms";
import { Images } from '_utils'
import { Mixins, Typography, Colors, AppStyles } from '_styles'
import { useNavigation } from "@react-navigation/native";
import SmallIcon from "./smallIcon";
import { moderateScale } from "react-native-size-matters";
let { margin, boxShadow, scaleSize, windowHeight } = Mixins

const Header = props => {
  const navigation = useNavigation()
  const {
    textColor, alignSelf,
    rightImage,
    rightText,
    leftText,
    image,
    rightStyle
    , onPressRight,
    style,
    onPressLeft } = props;
  return (
    <View style={[boxShadow('trasparent', {}, 0),
    styles.container,,style && style,{
      paddingHorizontal:moderateScale(16)
    }]} >
      {/************* leftText or Left Icon ***************/}
      {
        (leftText || image) && <TouchableOpacity
          onPress={() => onPressLeft ? onPressLeft() : navigation.goBack()}
          style={{
            flex: 0.1,
            alignSelf: alignSelf ? 'center' : "center",
          }}>
          <SmallIcon source={image ? image : Images.back} />
        </TouchableOpacity>
      }

      {/*************  Title  ***************/}
      <View style={{ alignSelf: "center", 
      flex: 0.8, }}>
        <Text h6 style={[{
          fontSize:Typography.normalize(22),
          color: textColor ? textColor : Colors.black,
          ...props.textStyle
        }]}>
          {props.title}
        </Text>
      </View>

      {/*********************  Right Text  ***********************/}
      {
        (rightText || rightImage) ? <TouchableOpacity
          onPress={() => onPressRight && onPressRight()}
          style={[{
            flex: 0.1,
            alignSelf:"center",
          },rightStyle && rightStyle]}>
          <SmallIcon source={rightImage ? rightImage : Images.back}
          style={{height:moderateScale(28),width:moderateScale(28)}}
          />
        </TouchableOpacity>:<View style={{flex:0.1}} />
      }
      
    </View>
  );
};
const styles = {
  container: {
    backgroundColor: "white",
    height: moderateScale(52),
    flexDirection: 'row',
    justifyContent: "center"
  },
  circle: {
    position: 'absolute',
    color: 'red',
    height: 18, width: 18, borderRadius: 18 / 2, backgroundColor: 'red',
    zIndex: 100, right: -10, bottom: 16
  }
};
export default Header;
