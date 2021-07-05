import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Keyboard,
} from 'react-native';
import {Text, Button, Header} from '_atoms';
import {ListEmptyComponent, BottomAbsoluteButton} from '_molecules';
import stripe from 'tipsi-stripe';
import {useDispatch, useSelector} from 'react-redux';

import {paymentMethodListRequest} from '../../../store/modules/getPaymentMethodList/actions';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {Images} from '_utils';
import {Typography, Colors, Mixins, AppStyles} from '_styles';
import {PaymentsItem} from '../templates';

let {boxShadow, padding} = Mixins;

// Component
const Payments = ({navigation, route}) => {
  /****************************** Get Store State & Hooks*************************************/
  const [state, setPaymentListData] = useState([]);
  const dispatch = useDispatch();
  const {paymentMethodData} = useSelector(state => ({
    paymentMethodData: state.paymentListReducer.paymentMethodData,
  }));
  const [refreshing, setRefreshing] = useState(false);

  const [paymentData, setPaymentData] = useState(
    route.params && route.params.paymentData
      ? {...route.params.paymentData}
      : null,
  );
  useEffect(() => {
    getPaymentMethodList();
  }, []);
  /****************************** Api Function *************************************/
  const getPaymentMethodList = () => {
    dispatch(paymentMethodListRequest(navigation));
  };
  const onRefreshList = () => {
    getPaymentMethodList();
  };
  /****************************** Render Main  *************************************/
  return (
    <View style={[{flex: 1, backgroundColor: Colors.white}]}>
      <Header
        leftText
        image={Images.back}
        onPressLeft={() => navigation.goBack()}
        style={[boxShadow('trasparent', {}, 0)]}
        title={'Payment Details'}
        textStyle={{textAlign: 'center'}}
      />
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.white,
          paddingTop: scale(12),
        }}>
        <FlatList
          data={paymentMethodData}
          showsVerticalScrollIndicator={false}
          refreshing={refreshing}
          onRefresh={() => onRefreshList()}
          ListEmptyComponent={() => (
            <ListEmptyComponent 
            message={'No tour plans found!'} />
          )}
          renderItem={({item, index}) => (
            <PaymentsItem
              item={item}
              disabled={route.params ? false : true}
              index={index}
              onPress={() =>
                navigation.navigate('DonePayement', {
                  paymentData: {
                    ...route.params.paymentData,
                    paymentSourceRefNo: item,
                  },
                })
              }
            />
          )}
          style={{backgroundColor: Colors.white}}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => 'store' + index}
        />
      </View>

      <BottomAbsoluteButton
        image={Images.add}
        onPress={() => navigation.navigate('AddPayment')}
      />
    </View>
  );
};

export default Payments;
