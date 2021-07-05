import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  ImageBackground,
  Keyboard,
} from 'react-native';
import {Text, Button, Label, SmallIcon, Header} from '_atoms';
import {Line} from '_molecules';
import Entypo from 'react-native-vector-icons/Entypo';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {Images,Methods} from '_utils';
import {Typography, Colors, Mixins, AppStyles} from '_styles';
import {getAddressRequest} from '../../../store/modules/address/actions';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';

let {boxShadow, padding, windowWidth, windowHeight} = Mixins;
import {BookingDetail, Invoice} from '../templates';
// Component
const BookingInfo = ({navigation, route}) => {
  const {paymentData} = route.params;
  const dispatch = useDispatch();
  const {defaultAddress = null} = useSelector(state => ({
    defaultAddress:
    state.addressReducer.addresses&& state.addressReducer.addresses.length > 0
        ? state.addressReducer.addresses.filter(x => x.default == true)[0]
        : null,
  }));
  const [state, setState] = useState({
    ...paymentData,
    totalAmount: Number(paymentData.doctorFee) + Number(paymentData.serviceFee),
  });
  const [promo, setPromoState] = useState({});
  console.log(defaultAddress,"defaultAddress")

  useEffect(() => {
    getAddressList();
  }, []);
  /****************************** Main Function *************************************/
  const getAddressList = () => {
    dispatch(getAddressRequest());
  };

  /****************************** Api Function *************************************/
  const selectPromo = item => {
    setPromoState(item);
    setState({
      ...state,
      totalAmount: state.totalAmount - Number(item.amount),
    });
  };
  const onPressAddPromo = () => {
    if (promo && promo.promocode) {
      setPromoState({});
      setState({
        ...state,
        totalAmount: state.totalAmount,
      });
    } else {
      navigation.navigate('Coupons', {
        selectPromo: item => selectPromo(item),
      });
    }
  };
  const onPressButton = () => {
    if (defaultAddress) {
      navigation.navigate('Payments', {
        screen: 'Payments',
        params: {
          fromScreen: 'booking',
          paymentData: {
            ...state,
            defaultAddress: defaultAddress,
            promo: promo,
          },
        },
      });
    } else {
      Methods.showToast('Please select address first', 'danger');
    }
  };
  /****************************** Render Child  *************************************/
  const RenderButton = ({title, transparent}) => {
    return (
      <View
        style={{
          justifyContent: 'center',
          paddingHorizontal: moderateScale(24),
          flex: 0.5,
        }}>
        <Button
          onPress={() => onPressButton()}
          buttonStyle={{
            borderRadius: 8,
          }}
          title={'Confirm'}
        />
      </View>
    );
  };
  const RenderAddress = () => {
    return (
      <View style={[AppStyles.row]}>
        {!defaultAddress && (
          <TouchableOpacity
            onPress={() => navigation.navigate('Addresses')}
            style={{flex: 0.6}}>
            <Label
              title={`Please Add address`}
              labelStyle={{
                fontSize: Typography.normalize(14),
                color: Colors.danger,
              }}
            />
          </TouchableOpacity>
        )}
        {defaultAddress && (
          <View style={{flex: 0.15}}>
            <Image
              source={Images.hometick}
              resizeMode={'contain'}
              style={{height: 48, width: moderateScale(48)}}
            />
          </View>
        )}
        {defaultAddress && (
          <View style={{flex: 0.6}}>
            <Label
              title={`Deleviry to ${defaultAddress.addressType}`}
              labelStyle={{
                fontSize: Typography.normalize(14),
              }}
              subTitle={`${defaultAddress.address}`}
            />
          </View>
        )}
        {defaultAddress && (
          <View style={{flex: 0.3}}>
            <Button
              onPress={() => navigation.navigate('Addresses')}
              buttonTextStyle={{color: Colors.danger}}
              buttonStyle={{
                borderRadius: 2,
                height: 48,
                backgroundColor: Colors.transparent,
              }}
              title={defaultAddress ? 'Change' : 'Add'}
            />
          </View>
        )}
      </View>
    );
  };

  const RenderPromoButton = () => {
    return (
      <TouchableOpacity
        onPress={() => onPressAddPromo()}
        style={[AppStyles.rowSpaceBetween, {flex: 1}]}>
        <Text
          p
          style={[
            AppStyles.medium,
            {
              paddingTop: 2,
              color: 'black',
            },
          ]}>
          {'Promo Code'}{' '}
          {promo && promo.promocode ? (
            <Entypo
              name={'circle-with-minus'}
              color={Colors.primary}
              size={18}
            />
          ) : (
            <Image
              source={Images.add}
              style={{height: moderateScale(16), width: moderateScale(16)}}
            />
          )}
        </Text>
      </TouchableOpacity>
    );
  };

  /****************************** Render Main  *************************************/
  return (
    <View style={[{flex: 1, backgroundColor: '#FDFDFD'}]}>
      <Header
        leftText
        image={Images.back}
        onPressLeft={() => navigation.goBack()}
        style={[
          boxShadow('trasparent', {}, 0),
          {
            backgroundColor: '#FDFDFD',
          },
        ]}
        title={'Booking Information'}
        textStyle={{textAlign: 'center'}}
      />
      <ScrollView
            showsVerticalScrollIndicator={false}

        style={{backgroundColor: '#FDFDFD'}}
        keyboardShouldPersistTaps={'never'}>
        <View
          style={[
            padding(16, 24, 8, 24),
            {
              flex: 1,
              marginTop: moderateScale(24),
            },
          ]}>
          {/*************** Session Detail ****************/}
          <Label title={'Booking Type'} />
          <Line lineColor={'rgba(0,0,0,0.1)'} />
          <BookingDetail leftTitle={`${state.bookingType}`} />
          {(state.bookingType !='instant') ? <View> 
            <View style={{height: verticalScale(24)}} />
          <Label title={'Appointment Date and Time'} />
          <Line lineColor={'rgba(0,0,0,0.1)'} />
          <BookingDetail leftTitle={`${moment(state.showDate).format('ll')},${state.showTime}`}
          />
          </View>:null
          }
          <View style={{height: verticalScale(24)}} />
          <Label title={'Additional information'} />
          <Line lineColor={'rgba(0,0,0,0.1)'} />

          <View style={{height: verticalScale(12)}} />
          <Text
            p
            style={[
              AppStyles.medium,
              {
                color: 'rgba(0,0,0,0.75)',
                fontSize: Typography.normalize(13),
              },
            ]}>{`${state.additionalInfo}`}</Text>

          <View style={{height: verticalScale(24)}} />
          <RenderAddress />
          <View style={{height: verticalScale(24)}} />

          {/*********** Promo List Button  *************/}
          <RenderPromoButton />
          {promo && promo.promocode ? (
            <BookingDetail
              leftTitle={promo ? promo.promocode : ''}
              rightTitle={promo ? `$${promo.amount}` : ''}
            />
          ) : null}
          <View style={{height: verticalScale(24)}} />

          {/*********** Invoice  *************/}

          <Label title={'Invoice Details'} />
          <Line lineColor={'rgba(0,0,0,0.1)'} />
          <View style={{height: verticalScale(16)}} />

          <Invoice
            item={{
              ...state,
              promoPrice: promo ? promo.amount : false,
            }}
          />
        </View>
        <View style={{height: verticalScale(24)}} />
        <RenderButton />
        <View style={{height: verticalScale(24)}} />
      </ScrollView>
    </View>
  );
};

export default BookingInfo;
