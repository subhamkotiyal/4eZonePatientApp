import React from "react";
import {
  TouchableNativeFeedback,
  TouchableHighlight,
  StyleSheet,
  View,
  Platform,
  Image,
  Text as NativeText
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { verticalScale, moderateScale, scale } from 'react-native-size-matters';

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Text from "./text";
import { Typography, Spacing, Colors, Mixins } from '_styles';
const Button = props => {
  const {
    disabled,
    title,
    titleView,
    buttonStyle,
    borderRadius,
    buttonTextStyle,
    onPress,
    secondary,
    secondary2,
    secondary3,
    iconLeft,
    iconLeftName,
    iconRight,
    color,
    fontSize,
    underlayColor,
    raised,
    textStyle,
    imageLeft,
    buttonViewStyle,
    iconRightName,
    subTitle,
    containerViewStyle,
    rightText,
    numberOfLines,
    ...attributes
  } = props;
  let { Component } = props;

  if (!Component && Platform.OS === "ios") {
    Component = TouchableHighlight;
  }
  if (!Component && Platform.OS === "android") {
    Component = TouchableNativeFeedback;
  }
  if (!Component) {
    Component = TouchableHighlight;
  }
  if (Platform.OS === "android" && (borderRadius && !attributes.background)) {
    attributes.background = TouchableNativeFeedback.Ripple(
      "ThemeAttrAndroid",
      true
    );
  }
  return (
    <View
      style={[styles.container, raised && styles.raised, 
        containerViewStyle]}
    >
      <Component
        underlayColor={underlayColor || "transparent"}
        onPress={onPress}
        disabled={disabled || false}
        {...attributes}
      >
        <View
          style={[
            styles.button,
            secondary && { backgroundColor: Colors.secondary },
            secondary2 && { backgroundColor: Colors.secondary2 },
            secondary3 && {
              backgroundColor: Colors.secondary3,
              borderColor: Colors.blue,
              borderWidth: 2
            },
            buttonStyle && buttonStyle
          ]}
        >
          <View style={{ flexDirection: "row", flex: 1 }}>
            {imageLeft ? (
              <View
                style={{
                  paddingLeft: 12,
                  justifyContent: "flex-start",
                  flex: 0.1
                }}
              >
                {props.imageSource ? (props.imageLeftLocal) ? <Image
                  style={{ width: 24, height: 24 }}
                  source={props.imageLeftLocal}
                /> :
                  (
                    <Image
                      style={{ width: 24, height: 24, borderRadius: 24 / 2 }}
                      source={{ uri: props.imageSource }}
                    />
                  ) : (
                    <Image
                      style={styles.iconLeft}
                      source={null}
                    />
                  )
                }
              </View>
            ) : null}
            {iconLeft ? (
              <View
                style={{
                  paddingRight: 12,
                  justifyContent: "flex-start",
                  flex: 0.1
                }}
              >
                {props.iconType == "FontAwesome" ? (
                  <FontAwesome
                    style={styles.iconLeft}
                    size={24}
                    color={Colors.transparentColor}
                    name={iconLeftName}
                  />
                ) : props.iconType == "MaterialIcons" ? (
                  <MaterialIcons
                    style={styles.iconLeft}
                    size={28}
                    color={
                      props.iconLeftColor
                        ? props.iconLeftColor
                        : Colors.transparentColor
                    }
                    name={iconLeftName}
                  />
                ) : (
                      <Icon
                        style={styles.iconLeft}
                        size={28}
                        color={Colors.transparentColor}
                        name={iconLeftName}
                      />
                    )}
              </View>
            ) : null}
            {title ? (
              <View
                style={[{
                  flex: iconRight || iconLeft ? (rightText ? 1 : 0.9) : 1,
                  paddingTop: imageLeft ? 4 : 0,
                  justifyContent: "flex-start",
                  paddingLeft: 10
                }, buttonViewStyle && buttonViewStyle]}
              >
                <View
                  style={[{
                    flexDirection: "row",
                    justifyContent: (iconRight || iconLeft ?
                      (rightText ? "space-between" : "flex-start") : "center"),

                  }, buttonTextStyle && buttonTextStyle]}
                >
                  <Text
                    style={[
                      styles.text,
                      color && { color },
                      fontSize && { fontSize },
                      textStyle && textStyle,
                      secondary && { color: Colors.grey0 },
                      secondary3 && { color: Colors.blue },
                      {
                        alignSelf:
                          iconRight || iconLeft ? "flex-start" : "center"
                      },
                      buttonTextStyle && buttonTextStyle
                    ]}
                    numberOfLines={numberOfLines ? numberOfLines : 5}
                  >
                    {title}
                  </Text>
                  {rightText && (
                    <Text style={{ alignSelf: "center" }} p>{rightText}</Text>
                  )}
                </View>
                {subTitle ? (
                  <Text
                    p
                    style={[
                      {
                        fontSize: 14,
                        lineHeight: 30,
                        color: Colors.transparentColor
                      },
                      props.subTitleStyle
                    ]}
                  >
                    {subTitle}
                  </Text>
                ) : null}
              </View>
            ) : null}
          </View>
          {titleView ? titleView : null}
          {iconRight ? (
            <View style={{ paddingHorizontal: 16, flex: 0.05 }}>
              <Icon
                style={styles.iconLeft}
                name={iconRightName}
                size={18}
                color={
                  props.iconColor ? Colors.iconColor : Colors.transparentColor
                }
              />
            </View>
          ) : null}
        </View>
      </Component>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent"
  },
  button: {
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    height:moderateScale(48),
    borderRadius:moderateScale(48)/2,
  },
  text: {
    color: "white",
    // alignSelf:'center',
    fontWeight: "500",
    fontSize: Typography.normalize(16)
  },
  iconLeft: {
    alignSelf: "center",
    height: 28,
    width: 28
  }
});
export default Button;

