import React, { Component } from "react";
import {
  TextInput,
  View,
  Animated,
  TouchableOpacity,
  Platform,
  Image,
  I18nManager
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Text from "./text";
import SmallIcon from './smallIcon'
import { Typography, Spacing, Colors, Mixins } from '_styles';
import { AppStyles } from "_styles";
import { boxShadow } from "../../styles/mixins";
let { windowHeight } = Mixins
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'


export default  TextInputLabel =  (props) =>  {
    let { isFocused, fromNotes, mainContainer, darkLabel, customeLabelStyle, fromPhone, isdropDown } =props;
    let labelStyle = {
      fontSize: !isFocused ? Typography.normalize(16) : Typography.normalize(16),
      color: !isFocused ? "rgba(0,0,0,0.44)" : "#4BBCB7",
    };

    //Border Style
    let borderColor = {
      borderColor: !isFocused ? "rgba(0,0,0,0.11)" : Colors.primary
    };
    let isRTL = I18nManager.isRTL
      return (
      <View style={[{flex:1,backgroundColor:'white' },
       mainContainer && mainContainer]}>

        {/********************* Label Textinput ************/}
        {
         props.label ? <View style={{ alignItems: 'flex-start' }}>
            <Text p style={[labelStyle, 
              !isFocused ? AppStyles.text : AppStyles.medium, 
              darkLabel && darkLabel, 
              customeLabelStyle && customeLabelStyle]}>
              {props.label}
            </Text></View>
            : null
        }
        <TouchableOpacity
          onPress={() => (props.onPress ? props.onPress() : null)}
          style={[
            {
              borderRadius: (moderateScale(48))/2,
              borderWidth:isFocused? 0.5:0 ,
              borderColor: borderColor.borderColor,
              paddingHorizontal:moderateScale(12),
              flexDirection: "row",
              backgroundColor:'white'
            },
            boxShadow('black',{height:1,width:0},1,0.1),
            props.viewTextStyle,

          ]}
          disabled={props.editable}
        >
        {/********************* Left Icon  ************/}
          {props && props.leftIcon ? (
            <View
              style={{
                flex: 0.1,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              {
                <SmallIcon source={props.leftIcon} />
              }
            </View>
          ) : null}

          {/*********************  Textinput  ************/}
          <View style={{flex:1,paddingLeft:moderateScale(8)}}>
            <TextInput
              style={[{
                height: moderateScale(48),
                fontSize: Typography.normalize(16),
                textAlign: isRTL ? "right" : "left",
                color: '#000000',
                ...props.textInputStyle,
              }, AppStyles.text,
               props.textInputStyle,
              ]}
              {...props}
              selectionColor={Colors.primary}
              ref={ref =>
                props.inputMenthod ? props.inputMenthod(ref) : null
              }
            />
          </View>
          {/*********************  Right Icon  ************/}
          {props && props.rightIcon ? (
            <View
              style={{
                flex: 0.05,
                justifyContent: "center",
                alignItems: "flex-end"
              }}
            >
              {
                <SmallIcon source={props.rightIcon} />
              }
            </View>
          ) : null}
        </TouchableOpacity>

      </View>
    );
  }
