import React, { useState, useRef, useEffect, } from 'react';
import { View, TouchableOpacity, ScrollView, ImageBackground, Keyboard } from 'react-native';
import { Text, Button, Label, SmallIcon, Header } from '_atoms'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { Images } from '_utils'
import { useDispatch, useSelector } from "react-redux";

import { Typography, Colors, Mixins, AppStyles } from '_styles';
import { ListEmptyComponent} from '_molecules'
import {
  getDisputeRequest
} from '../../../store/modules/dispute/actions'
import {MyTopTabs} from '../'
let { boxShadow, padding, windowWidth, windowHeight } = Mixins

// Component 
const Disputes = ({ navigation }) => {
  const dispatch = useDispatch()
  const { completedDispute=[], inProcessDispute=[]} = useSelector(state => ({
    completedDispute: state.disputeReducer.completedDispute,
      inProcessDispute: state.disputeReducer.inProcessDispute,
  }));
  useEffect(() => {
    getDispute()
  }, [])
  /****************************** Api Function *************************************/
  const getDispute = () => {
        dispatch(getDisputeRequest())
  }
    /****************************** Render Main  *************************************/
    return <View style={[{ flex: 1 }]}>
            <Header
            style={[boxShadow('trasparent', {}, 0)]}
            title={'Dispute'}
            leftText
            image={Images.hamburger}
            onPressLeft={()=> navigation.openDrawer()}
            textColor={Colors.black}
            textStyle={{ textAlign: 'center' }}
          />
          <MyTopTabs
            completedDispute={completedDispute}
            inProcessDispute={inProcessDispute}
          />
         
    </View>
}

export default Disputes;