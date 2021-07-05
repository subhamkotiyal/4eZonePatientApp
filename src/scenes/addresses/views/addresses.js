import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
  ScrollView,
  Keyboard,
} from 'react-native';
import {Text, Button, Header, Label} from '_atoms';
import {ListEmptyComponent, BottomAbsoluteButton} from '_molecules';
import {useDispatch, useSelector} from 'react-redux';
import {Line} from '_molecules';

import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {Images} from '_utils';
import {Typography, Colors, Mixins, AppStyles} from '_styles';
import {getAddressRequest,getDefaultAddressRequest} from '../../../store/modules/address/actions';
let {boxShadow, padding} = Mixins;
// Component
const Addresses = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {addresses = [],defaultAddress=null} = useSelector(state => ({
    defaultAddress: state.addressReducer.addresses.length >0 ?
    state.addressReducer.addresses.filter(x=>x.default == true)[0]:null,
    addresses: state.addressReducer.addresses,
  }));
  useEffect(() => {
    getAddressList();
  }, []);

  /****************************** Api Function  *************************************/
  const getAddressList = () => {
    dispatch(getAddressRequest());
  };
  const markDefaultAddress = async addressId => {
    try {
      let data = {};
      data['addressId'] = addressId;
      dispatch(getDefaultAddressRequest(data,navigation));
    } catch (err) {
      showToast(err.message, 'danger');
      setLoading(false);
    }
  };


  /****************************** Render Main  *************************************/
  return (
    <View style={[{flex: 1, backgroundColor: Colors.white}]}>
      <Header
        leftText
        image={Images.back}
        onPressLeft={() => navigation.goBack()}
        style={[boxShadow('trasparent', {}, 0), padding(0, 8)]}
        title={'Saved Addresses'}
        textStyle={{textAlign: 'center'}}
      />
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.white,
          paddingHorizontal: moderateScale(16),
          paddingTop: scale(12),
        }}>
        {/********    Add adrrees and default address  ********/}
        <TouchableOpacity onPress={() => navigation.navigate('AddAddress')}>
          <Label
            leftImage={Images.add}
            title={'Add address'}
            labelStyle={{
              color: Colors.primary,
              fontSize: Typography.normalize(14),
            }}
          />
        </TouchableOpacity>

        <View style={{height: verticalScale(2)}} />
          {
  defaultAddress && <View>
 <Line lineColor={'rgba(0,0,0,0.05)'} />
        <View style={{height: verticalScale(8)}} />
        <Label
          title={'Delivers to'}
          labelStyle={{
            color: Colors.black,
            fontSize: Typography.normalize(16),
          }}
        />
        <View style={{height: verticalScale(2)}} />
        <Line lineColor={'rgba(0,0,0,0.05)'} />
        <View style={{height: verticalScale(8)}} />
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Label
            title={defaultAddress.addressType}
            leftImage={Images.address_Home}
            labelStyle={{
              color: Colors.black,
              fontSize: Typography.normalize(14),
            }}
            subTitle={defaultAddress.address}
            subLabelStyle={{
              fontSize: Typography.normalize(13),
            }}
          />
        </TouchableOpacity>
        <View style={{height: verticalScale(2)}} />
        <Line lineColor={'rgba(0,0,0,0.05)'} />
              </View>
          }
       
        <View style={{height: verticalScale(8)}} />
        <Label
          title={'Does not deliver to'}
          labelStyle={{
            color: Colors.black,
            fontSize: Typography.normalize(16),
          }}
        />
        <View style={{height: verticalScale(2)}} />

        <Line lineColor={'rgba(0,0,0,0.05)'} />
        <View style={{height: verticalScale(2)}} />

        <FlatList
          data={defaultAddress ? addresses.filter(x=> defaultAddress && defaultAddress._id != x._id) :addresses}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <ListEmptyComponent message={'No data found!'} />
          )}
          renderItem={({item, index}) => (
            <TouchableOpacity 
            onPress={()=> markDefaultAddress(item._id)}
            style={{paddingTop: 6}}>
              <Label
                title={item.addressType}
                labelStyle={{
                  color: 'rgba(0,0,0,0.3)',
                  fontSize: Typography.normalize(14),
                }}
                subTitle={`${item.houseNo}, ${item.area},${item.landmark} ${item.address}`}
                subLabelStyle={{
                  fontSize: Typography.normalize(13),
                  color: 'rgba(0,0,0,0.3)',
                }}
              />
              <View style={{height: verticalScale(2)}} />

              <Line lineColor={'rgba(0,0,0,0.05)'} />
            </TouchableOpacity>
          )}
          style={{backgroundColor: Colors.white}}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => 'store' + index}
        />
      </View>
    </View>
  );
};

export default Addresses;
