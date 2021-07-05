import React,{useState} from "react";
import { StyleSheet, View,ActivityIndicator, TouchableOpacity, Image } from "react-native";
const  ListFooterComponent = ({fetchingStatus}) => {
  return (
    <View>
      {fetchingStatus ? (
        <ActivityIndicator
          size="large"
          color="#F44336"
          style={{marginLeft: 6}}
        />
      ) : null}
    </View>
  );
};

export default ListFooterComponent
