import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import {Text, Button, Label, SmallIcon, Header} from '_atoms';
import {Line} from '_molecules';

import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {Images, Methods} from '_utils';
import {Typography, Colors, Mixins, AppStyles} from '_styles';
import {MyTopTabs} from '../';
let {boxShadow, padding, windowWidth, windowHeight} = Mixins;
import {useDispatch, useSelector} from 'react-redux';
import Config, {SUCCESS} from '_utils/constants/apiConstant';
import {Request} from '_services';
import {
  AdditinalInfo,
  TimingInfo,
  DetailHeader,
  Fees,
  TrainerItem,
} from '../templates';
// Component
const DoctorDetails = ({navigation, route}) => {
  const {from, itemDetail} = route.params;
  const dispatch = useDispatch();
  const [item, setItem] = useState(itemDetail);

  useEffect(() => {
    getDoctorDetail();
    let availaABilyty = item.availability;

    console.log(availaABilyty, 'availaABilyty');
  }, []);
  /****************************** Api Function *************************************/
  const getDoctorDetail = async () => {
    if (item) {
      try {
        let docData = await Request.get(`${Config.doctorDetail}/${item._id}`);
        if (docData.status === SUCCESS) {
          setItem(docData.data);
        }
      } catch (err) {
        console.log(err.message, 'Error in fav');
      }
    }
  };
 
  /****************************** Render Main  *************************************/
 
  return (
    <View style={[{flex: 1, backgroundColor: 'white'}]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{backgroundColor: 'white'}}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'never'}>
        <DetailHeader item={item} />

        <View style={AppStyles.detailContainer}>
          {/******************* Doctor Item  ***************/}
          <View>
            <TrainerItem
              onPressChat={()=> null}
              isRightIcon={Images.videocall}
              item={item}
              from={from}
            />
          </View>
          <Line />
          {/******************* Doctor Item  ***************/}
          <View style={{height: 8}} />
          <AdditinalInfo
            leftImage={Images.education}
            leftTitle={item.education ? item.education : 'No Education'}
          />
          <AdditinalInfo
            leftImage={Images.listone}
            leftTitle={item.speciality ? item.speciality.specialistName : ''}
          />
          <AdditinalInfo
            leftImage={Images.formaladdress}
            leftTitle={item.address}
          />
          <View style={{height: 8}} />
          <Line />
          {/******************* Fees Item  ***************/}
          <View style={{height: 8}} />
          <Fees
            leftTitle={'Fees'}
            leftImage={Images.fees}
            rightTitle={`$${item.doctorFee}`}
          />
          <View style={{height: 8}} />
          <Line />
          {/******************* Doctor timing  ***************/}
          <View style={{height: 8}} />
          <Fees leftImage={Images.calender2} leftTitle={'Timing'} />
          <View style={{height: 8}} />
          {item.availability && item.availability.length > 0 ? (
            item.availability.map((obj, i) => {
              return (
                <TimingInfo
                  leftTitle={obj.day}
                  rightTitle={`${obj.openTime} to ${obj.closeTime}`}
                />
              );
            })
          ) : (
            <TimingInfo leftTitle={'No availability found! '} />
          )}
          <View style={{height: 8}} />
          <Line />
        </View>
        
      </ScrollView>
  
      <Button
        buttonStyle={{borderRadius: 0, 
          marginBottom:8,
          marginHorizontal: 16}}
        onPress={() =>
          navigation.navigate('Questionary', {
            ...route.params,
            ...item,
          })
        }
        title={'Book An Appointment'}
      />
    </View>
  );
};

export default DoctorDetails;
