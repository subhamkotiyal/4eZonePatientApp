
import React from "react";
import { SafeAreaView, View } from "react-native";
import ScrollableTabView, {
    ScrollableTabBar
  } from "react-native-scrollable-tab-view";
import { Typography, Spacing, Colors, Mixins,AppStyles } from '_styles';

export default ScrollableTab = props => {
return (
    <ScrollableTabView
      style={{marginTop:-5,width: "100%" ,backgroundColor:'white'}}
      initialPage={0}
      renderTabBar={() => (
        <ScrollableTabBar
          underlineStyle={{
            position: "absolute",
            height: 3,
            backgroundColor: Colors.lightblack,
            bottom: 0
          }}
        />
      )}
      scrollWithoutAnimation
      tabBarActiveTextColor={Colors.lightblack}
      tabBarInactiveTextColor={"#999999"}
      tabBarTextStyle={[
        AppStyles.medium,{ 
        fontSize: Typography.normalize(16), }]}
      showsHorizontalScrollIndicator={false}
      refreshControlStyle={{ backgroundColor: "red" }}
      onChangeTab={(event) => {props.onChangeTab ?  props.onChangeTab(event) :null}}
    >
      {props.tabs
        ? props.tabs.map((item, index) => {
            return props.renderListTabs(item, index);
          })
        : null}
    </ScrollableTabView>
  );
}