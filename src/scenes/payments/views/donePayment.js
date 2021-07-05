import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Keyboard,
  Image,
  ScrollView,
  AppStylesheet,
} from 'react-native';
import {Text, Button, Header, TextInput, SmallIcon} from '_atoms';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {Images} from '_utils';
import * as RNLocalize from 'react-native-localize';

import {Line} from '_molecules';
import {useDispatch, useSelector} from 'react-redux';
import Config, {SUCCESS} from '_utils/constants/apiConstant';

import {Typography, Colors, Mixins, AppStyles} from '_styles';
let {padding, boxShadow, margin} = Mixins;
import {addBookingRequest} from '../../../store/modules/booking/actions';
// Component
const DonePayement = ({navigation, route}) => {
  const [paymentData, setPaymentData] = useState({
    ...route.params.paymentData,
  });
  console.log(paymentData, 'paymentData---');
  const dispatch = useDispatch();

  /****************************** Api Function *************************************/
  const addBooking = () => {
    let {paymentData} = route.params;
    debugger;
    if (paymentData) {
      //payload
      let data = {};
      data['scheduleDate'] = paymentData.scheduleDate;
      data['scheduleTime'] = paymentData.scheduleTime;
      data['bookingType'] = paymentData.bookingType;
      data['paymentMethod'] = paymentData.paymentSourceRefNo && paymentData.paymentSourceRefNo.type =='Cash' ?'cash':'stripe';
      data['paymentSourceRefNo'] = paymentData.paymentSourceRefNo._id;
      data['doctorId'] = paymentData._id;
      data['addressId'] = paymentData.defaultAddress._id;
      data['promocode'] =
        paymentData.promo && paymentData.promo.promocode
          ? paymentData.promo.promocode
          : 'none';
      data['promoCodeCost'] =
        paymentData.promo && paymentData.promo.promocode
          ? paymentData.promo.amount
          : 0;
      data['questionaire'] = paymentData.questionaire;
      data['doctorFee'] = paymentData.doctorFee;
      data['serviceFee'] = paymentData.serviceFee;
      data['timezone'] = RNLocalize.getTimeZone();
      data['additionalInfo'] = paymentData.additionalInfo;
        console.log(data,"datadatadata")
      let apiname = Config.addBooking;
      dispatch(addBookingRequest(apiname, data, navigation));
    }
  };

  /****************************** Render Main  *************************************/
  return (
    <View style={[{flex: 1, backgroundColor: Colors.white}]}>
       <Header
        leftText
        image={Images.back}
        onPressLeft={() => navigation.goBack()}
        style={[boxShadow('trasparent', {}, 0)]}
        title={'Done Payment'}
        textStyle={{textAlign: 'center'}}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[padding(16, 0, 0, 0)]}
        style={{backgroundColor: Colors.white}}>
        {/********************************************* Top Item  **********************************/}
        <View style={{height: moderateScale(8)}} />

        <View style={[AppStyles.rowSpaceBetween, AppStyles.doneContainer]}>
          <View style={AppStyles.doneLeftRow}>
            <SmallIcon
              source={
                paymentData.paymentSourceRefNo &&
                paymentData.paymentSourceRefNo.logo
                  ? {uri: paymentData.paymentSourceRefNo.logo}
                  : Images.visa
              }
              style={AppStyles.donePayIcon}
            />
          </View>
          <View style={AppStyles.doneRightRow}>
            <View style={{paddingTop: 8}}>
              <Image source={Images.cart} style={AppStyles.doneCartIcon} />
            </View>
            <View style={AppStyles.donePriceTextView}>
              <Text h6 style={AppStyles.donePayText}>
                ${paymentData.totalAmount}
              </Text>
            </View>
          </View>
        </View>
        <Line lineColor={'rgba(0, 0, 0, 0.1)'} />

        {/********************************************* Send  To View  **********************************/}
        <View style={{height: verticalScale(4)}} />
        <View style={[AppStyles.sendToContainer]}>
          <View>
            <Text p style={AppStyles.sendToPayText}>
              Send To
            </Text>
          </View>
          <View style={{paddingTop: moderateScale(2), paddingBottom: 8}}>
            <Text p style={AppStyles.sendGymPayText}>
              {paymentData.name}
            </Text>
          </View>
          <Line lineColor={'rgba(0, 0, 0, 0.1)'} />
        </View>

        {/**************************************** Pay With View **********************************/}
        <View
          style={[
            AppStyles.sendToContainer,
            {
              paddingVertical: moderateScale(4),
            },
          ]}>
          <View>
            <Text p style={AppStyles.sendToPayText}>
              Pay With
            </Text>
          </View>
          <View style={[AppStyles.rowSpaceBetween, AppStyles.donePayContainer]}>
            <View
              style={[
                AppStyles.doneLeftRow,
                AppStyles.row,
                {
                  flex: 1,
                  justifyContent: 'flex-start',
                },
              ]}>
              <View style={{paddingTop: 4}}>
                <Image
                  source={
                    paymentData.paymentSourceRefNo &&
                    paymentData.paymentSourceRefNo.logo
                      ? {
                          uri:
                            paymentData.paymentSourceRefNo &&
                            paymentData.paymentSourceRefNo.logo,
                        }
                      : Images.visa
                  }
                  resizeMode={'contain'}
                  style={AppStyles.donePayWithIcon}
                />
              </View>
              <View style={{paddingLeft: moderateScale(8)}}>
                <Text p style={[AppStyles.sendGymPayText]}>
                  {paymentData.paymentSourceRefNo &&
                  paymentData.paymentSourceRefNo.detials
                    ? paymentData.paymentSourceRefNo.detials
                    : `Debit/Credit Card: ${paymentData.paymentSourceRefNo.name}`}
                </Text>
              </View>
            </View>
            <View style={AppStyles.doneRightRow}>
              <View style={{paddingTop: 2}}>
                <Image
                  source={Images.cart}
                  style={AppStyles.doneCartPaywithIcon}
                />
              </View>

              <View style={AppStyles.donePriceTextView}>
                <Text
                  h6
                  style={[
                    AppStyles.donePayText,
                    {
                      fontSize: Typography.normalize(12),
                    },
                  ]}>
                  ${paymentData.totalAmount}
                </Text>
              </View>
            </View>
          </View>
          {paymentData.paymentSourceRefNo &&
            paymentData.paymentSourceRefNo.lastd && (
              <View style={{paddingBottom: 8}}>
                <Text p style={AppStyles.sendGymPayText}>
                  xxxx-xxxx-xxxx-
                  {paymentData.paymentSourceRefNo
                    ? paymentData.paymentSourceRefNo.lastd
                    : ''}
                </Text>
              </View>
            )}
        </View>
        {/***********************************Confirm Button  **********************************/}
        <View
          style={{
            justifyContent: 'center',
            marginVertical: moderateScale(52),
            paddingHorizontal: moderateScale(16),
            flex: 1,
          }}>
          <Button
            buttonStyle={{borderRadius: 8}}
            onPress={() => addBooking()}
            title={'Confirm'}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default DonePayement;
