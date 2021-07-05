import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Platform,
  ScrollView,
  ImageBackground,
  Keyboard,
} from 'react-native';
import {Text, Button, Label, SmallIcon, Header, TextInput} from '_atoms';
import {Line} from '_molecules';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useDispatch, shallowEqual, useSelector} from 'react-redux';
import moment from 'moment';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {Images, Validation, Methods} from '_utils';
import {Typography, Colors, Mixins, AppStyles} from '_styles';
let {boxShadow, padding, windowWidth, windowHeight} = Mixins;
import {RenderRadioCheckUncheck, DateTimeServiceView} from '../templates';
var dt = new Date();
dt.setMinutes(dt.getMinutes() + 90);
// Component
const Schedule = ({navigation, route}) => {
  let nameField, phoneField, addressField, landMarkField, specialField;
debugger
  const {language, profileData} = useSelector(state => ({
    language: state.switchLanguage.language,
    profileData: state.getProfileReducer.profileData,
  }));
  const [state, setState] = useState({
    additionalInfo:'',
    bookingType:'schedule',
  });

  const [date, setDate] = useState(dt);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  /****************************** Validation *************************************/
  const ValidationRules = () => {
    let {
      additionalInfo = '',
      bookingType
    } = state;
    let {code} = language;
    return [
      {
        field: additionalInfo,
        name: 'Additional Info',
        rules: 'required',
        lang: code,
      },
      
    ];
  };

  /****************************** Function Main  *************************************/
  const handleChange = (value, name) => {
    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  /******** Date Time picker  *************/
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDateTimepicker = pickerType => {
    showMode(pickerType);
  };
  const setHandleAddress = (address, placeId, location) => {
    setState(prevState => ({
      ...prevState,
      ['address']: address,
      ['placeId']: placeId,
      ...location,
    }));
  };
  const pressButton = () => {
       let {
        bookingType,
        additionalInfo
    } = state;
    let validation = Validation.validate(ValidationRules());
    let {showToast} = Methods;
    if(!bookingType){
      showToast('Please select booking type', 'danger');

    }else if (validation.length != 0) {
      showToast(validation[0].message, 'danger');
    } else {
      let data = {};
      data['scheduleDate'] = moment(date).format('DD-MM-YYYY');
      data['scheduleTime'] = moment(date).format('HH:mm:ss');
      data['showDate']=date
      data['showTime']=moment(date).format('h:mm A');

      data['serviceFee'] = 70
      data['bookingType'] = bookingType
      if (additionalInfo) {
        data['additionalInfo'] = additionalInfo;
      }
      navigation.navigate('BookingInfo', {
        paymentData: {...data,...route.params},
      });
    }
  };
  /****************************** Render Child  *************************************/
  const RenderButton = ({title, transparent}) => {
    return (
      <View
        style={{
          justifyContent: 'center',
          paddingHorizontal: moderateScale(24),
          flex: 1,
          zIndex: 10,
        }}>
        <Button
          buttonStyle={{borderRadius: 4}}
          onPress={() => pressButton()}
          title={'Continue'}
        />
      </View>
    );
  };

  /****************************** Render Main  *************************************/
  return (
    <View style={[{flex: 1, backgroundColor: Colors.white}]}>
      <Header
        leftText
        image={Images.back}
        onPressLeft={() => navigation.goBack()}
        style={[
          boxShadow('trasparent', {}, 0),
          {backgroundColor: Colors.white},
        ]}
        title={'Schedule'}
        textStyle={{textAlign: 'center'}}
      />
      <ScrollView
            showsVerticalScrollIndicator={false}

        style={{backgroundColor: Colors.white}}
        keyboardShouldPersistTaps={'never'}>
        <View
          style={[
            padding(24, 24, 8, 24),
            {
              flex: 1,
            },
          ]}>
          <Label title={'Booking Type:'} />
          <View style={{height: verticalScale(8)}} />
          <RenderRadioCheckUncheck
            onSelect={value => handleChange(value, 'bookingType')}
            value={state.bookingType}
            leftTitle={'Instant Booking'}
            leftvalue={'instant'}
            rightvalue={'schedule'}

            rightTitle={'Schedule Booking'}
          />
          <View style={{height: verticalScale(24)}} />

          {/******* Date Time Service *************/}
          
          {state.bookingType !== 'instant' && <View><Label title={'Select Date and Time'} />
          <DateTimeServiceView
            showDateTimepicker={showDateTimepicker}
            onChange={onChange}
            date={date}
          />
            </View>}
          {/***************** Additional  Information *************/}

          <View style={{flex: 0.5, marginTop: moderateScale(32)}}>
            {/*************** Achhount Holder Name *******************/}

            <TextInput
              label={''}
              inputMenthod={input => {
                specialField = input;
              }}
              placeholder={'Additional information'}
              placeholderTextColor="rgba(62,62,62,0.55)"
              returnKeyType="next"
              keyboardType="default"
              autoCorrect={false}
              autoCapitalize="none"
              textInputStyle={[
                AppStyles.schTextInputStyle,
                {
                  height: moderateScale(96),
                  paddingTop: 16,
                  paddingLeft: 8,

                },
              ]}
              multiline
              blurOnSubmit={false}
              viewTextStyle={[
                AppStyles.viewAddressTextSchStyle,
                {
                  height: moderateScale(96),
                  ...boxShadow('black', {height: 1, width: 0}, 2, 0.2),
                },
              ]}
              underlineColorAndroid="transparent"
              onChangeText={text => handleChange(text, 'additionalInfo')}
              onSubmitEditing={event => {
                Keyboard.dismiss();
              }}
            />
          </View>
        </View>
      </ScrollView>
      {!show && <RenderButton />}

      {/*************** Get Date Time Picker *******************/}
      {show && (
        <View>
          {Platform.OS == 'ios' ? (
            <TouchableOpacity
              onPress={() => setShow(false)}
              style={[AppStyles.shadowBlur, AppStyles.datePickerStyle]}>
              <Text p style={{color: Colors.primary}}>
                Close
              </Text>
            </TouchableOpacity>
          ) : null}
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            minimumDate={dt}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        </View>
      )}
    </View>
  );
};

export default Schedule;
