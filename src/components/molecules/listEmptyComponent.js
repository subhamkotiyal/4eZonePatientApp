import React from "react";
import { View } from "react-native";
import { Text } from "_atoms";

const ListEmptyComponent = ({message,customeStyle}) => {
  return <View style={[{ flex: 1, alignSelf: 'center',margin:'25%' },customeStyle && customeStyle]}><Text p>{message}</Text></View>
}


export default ListEmptyComponent;
