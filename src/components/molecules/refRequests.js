import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  Alert,
  ScrollView,
  Keyboard,
} from 'react-native';
import Modal from 'react-native-modal';

import {Text, Button, Header} from '_atoms';
import {ListEmptyComponent, CenterModal} from '_molecules';
import {useDispatch, shallowEqual, useSelector} from 'react-redux';
import {CommonActions} from '@react-navigation/native';
import {WSService, Methods} from '_utils';
import {Request} from '_services';
import Config, {SUCCESS} from '_utils/constants/apiConstant';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {Images} from '_utils';
import {Typography, Colors, Mixins, AppStyles} from '_styles';
import RefRequestItem from './refRequestItem';

let {boxShadow, padding} = Mixins;

//Component
const RefRequest = ({refRequest, updateRefList}) => {
  /****************************** Api Function  *************************************/
  //Reject Request
  const rejectRequest = async item => {
    let {showToast} = Methods;
    try {
      let data = {};
      let apiName = Config.changeCustomerOrderStatus;
      data['orderId'] = item._id;
      data['status'] = 'rejected';
      const orderStatus = await Request.post(apiName, data);
      console.log(orderStatus,"orderStatus1")

      if (orderStatus.status == 1) {
        updateRefList(item);
      } else {
        showToast(orderStatus.message, 'danger');
      }
    } catch (err) {
      showToast(err.message, 300);
    }
  };
  //Press Accept /assign Button
  const pressButton = item => {
    assignRequest(item);
  };
  //Accept Trainer Request
  const assignRequest = async item => {
    let {showToast} = Methods;
    try {
      let data = {};
      let apiName = Config.changeCustomerOrderStatus;
      data['orderId'] = item._id;
      data['status'] = 'accepted';
      const orderStatus = await Request.post(apiName, data);
      console.log(orderStatus,"orderStatus2")
      if (orderStatus.status == 1) {
        updateRefList(item);
      } else {
        showToast(orderStatus.message, 'danger');
      }
    } catch (err) {
      showToast(err.message, 300);
    }
  };

  /****************************** Function Main  *************************************/

  const deletRequest = item => {
    Alert.alert(
      'Alert!',
      'Are you sure you want to reject this request?',
      [
        {text: 'Ok', onPress: () => rejectRequest(item)},
        {text: 'Cancel', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
    );
  };

  /****************************** Render Main  *************************************/
  return (
    <Modal isVisible={refRequest.length > 0}
    style={{ width: '100%',margin:4}}
    > 
    <View
      style={{
        flex: 1,
        width: '100%',
        top: 10,
        justifyContent:'center'
      }}>
      <ScrollView
      showsVerticalScrollIndicator={false}
        decelerationRate={0}
        snapToAlignment={'center'}
        style={[
          {
            flex: 1,
            backgroundColor: 'rgba(255,255,255,0.75)',
          },
        ]}>
        <View
          style={{
            flex: 1,
            paddingTop: scale(16),
            paddingBottom:scale(16),
            backgroundColor: 'rgba(255,255,255,0.85)',
          }}>
          {refRequest.map((item, index) => {
            return (
              <RefRequestItem
                item={item}
                index={index}
                rejectRequest={() => deletRequest(item)}
                assignedPress={() => pressButton(item)}
              />
            );
          })}
        </View>
       </ScrollView>
    </View>
    </Modal>
  );
};

export default RefRequest;
