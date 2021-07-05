
import React, { Component } from "react";
import { View,Image} from "react-native";
import Modal from "react-native-modal";
import { AppStyles } from "_styles";
import { moderateScale, scale } from "react-native-size-matters";

const SmallIcon = ({ source,style }) => {
    return (
        <Image source={source}
        resizeMode={'contain'}
            style={[{ height: scale(14), width: '100%',
                 alignSelf: 'center' },style && style]} />

    );
};
export default SmallIcon
