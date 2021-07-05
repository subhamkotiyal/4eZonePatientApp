import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  ImageBackground,
  Keyboard,
} from 'react-native';
import {Text, Button, TextInput, SmallIcon, Header} from '_atoms';
import {ListEmptyComponent} from '_molecules';
import PhoneInput ,{getAllCountries} from 'react-native-phone-input';
import CountryPicker, {Flag,CountryCodeList} from 'react-native-country-picker-modal';
import { Methods } from '_utils'

import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {Images} from '_utils';
import {Typography, Colors, Mixins, AppStyles} from '_styles';
import {useDispatch, shallowEqual, useSelector} from 'react-redux';

let {boxShadow, padding, windowWidth, windowHeight} = Mixins;
import {ProfileView, BottomView} from '../templates';
import {logoutRequest} from '../../../store/modules/password/actions';

// Component
const Profile = ({navigation, route}) => {
  /****************************** Get Store State & Hooks*************************************/
  const dispatch = useDispatch();
  let emailField,
    phoneRef,
    passwordField,
    nameField,
    addressField,
    gymField,
    contactField;
  const {language, profileData} = useSelector(state => ({
    language: state.switchLanguage.language,
    profileData: state.getProfileReducer.profileData,
  }));
  const [visible, setVisible] = useState(false);

  const [state, setState] = useState({
    ...profileData,
    countryCode:profileData && profileData.countryCode ?profileData.countryCode:'+46',
    countryName:
      profileData && profileData.countryName ? profileData.countryName : 'SE',
  });
  useEffect(() => {
    getCountryCode();
  }, []);
  useEffect(() => {
    setState({...profileData});
  }, [profileData]);
  useEffect(() => {
    setState({...profileData});
  }, [profileData && profileData.profileImage]);
  useEffect(() => {
    setState({...state});
  }, [state.countryName]);
  /****************************** API Function *************************************/
  const logoutAgain = () => {
    dispatch(logoutRequest(navigation));
  };

  /****************************** Function Main  *************************************/
  const handleChange = (value, name) => {
    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  const onSelect = country => {
    // console.log(country,"countrycountry")
    setState(prevState => ({
      ...prevState,
      ['countryCode']: '+' + country.callingCode,
      ['countyName']: country.cca2,
    }));
    setVisible(false);
  };
  const LogoutAction = () => {
    Alert.alert(
      'Alert!',
      'Are you sure you want to logout?',
      [
        {text: 'Ok', onPress: () => logoutAgain()},
        {text: 'Cancel', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
    );
  };

  const getCountryCode = async () => {
  };

  /****************************** Render Main  *************************************/
  return (
    <View style={[{flex: 1,backgroundColor:'white'}]}>
      {/*************** Backgroud Header *******************/}
      <Header
            leftText
            image={Images.backwhite}
            rightImage={Images.edit}
            onPressLeft={() => navigation.goBack()}
            onPressRight={() => navigation.navigate('EditProfile')}
            rightStyle={{flexDirection: 'row'}}
            style={[
              boxShadow('trasparent', {}, 0),
              {
                paddingHorizontal: moderateScale(16),
                backgroundColor: '#499FD2',
              },
            ]}
            title={'Profile'}
            textStyle={{textAlign: 'center',color:'white'}}
          />
        <Image
          source={Images.profilebg}
          resizeMode={'stretch'}
          style={{width: '100%', 
          height: windowHeight/5}} />
        <ProfileView user={state} />
        <View style={{height: verticalScale(64)}} />

        <ScrollView
              showsVerticalScrollIndicator={false}

        contentContainerStyle={padding(24,0)}
        style={{backgroundColor: 'white',flex:1}}
        keyboardShouldPersistTaps={'never'}>
        <View style={{flex: 0.5,
            backgroundColor:'white',
            paddingHorizontal:moderateScale(16)}}>
          {/*************** Name field *******************/}
          <TextInput
            label={''}
            inputMenthod={input => {
              nameField = input;
            }}
            placeholder={'Name'}
            placeholderTextColor="rgba(62,62,62,0.55)"
            returnKeyType="next"
            keyboardType="default"
            autoCorrect={false}
            autoCapitalize="none"
            blurOnSubmit={false}
            editable={false}
            value={state.name}
            leftIcon={Images.nameIcon}
            viewTextStyle={AppStyles.viewTextStyle}
            underlineColorAndroid="transparent"
            isFocused={state.nameFieldFocus}
            onFocus={() => handleChange(true, 'nameFieldFocus')}
            onBlur={() => handleChange(false, 'nameFieldFocus')}
            onChangeText={text => handleChange(text, 'name')}
            onSubmitEditing={event => {
              emailField.focus();
            }}
          />
          <View style={{height: verticalScale(24)}} />
          {/*************** Email field *******************/}
          <TextInput
            label={''}
            inputMenthod={input => {
              emailField = input;
            }}
            placeholder={'Email'}
            editable={false}
            value={state.email}
            placeholderTextColor="rgba(62,62,62,0.55)"
            returnKeyType="next"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            blurOnSubmit={false}
            leftIcon={Images.mailLight}
            viewTextStyle={AppStyles.viewTextStyle}
            underlineColorAndroid="transparent"
            isFocused={state.emailFieldFocus}
            onFocus={() => handleChange(true, 'emailFieldFocus')}
            onBlur={() => handleChange(false, 'emailFieldFocus')}
            onChangeText={text => handleChange(text, 'email')}
            onSubmitEditing={event => {
              phoneRef.focus();
            }}
          />
          <View style={{height: verticalScale(24)}} />
          {/*************** Phone Input field *******************/}
           {/*************** Phone Input field *******************/}
           <TextInput
                        label={''}
                        inputMenthod={input => {
                          phoneRef = input;
                        }}
                        value={`${state.countryCode} ${state.mobileNumber}`}
                        placeholderTextColor="rgba(62,62,62,0.55)"
                        returnKeyType="next"
                        autoCorrect={false}
                        autoCapitalize="none"
                        blurOnSubmit={false}
                        editable={false}
                        leftIcon={Images.call}
                        viewTextStyle={AppStyles.viewTextStyle}
                        underlineColorAndroid="transparent"
                        // isFocused={state.emailFieldFocus}
                        // onFocus={() => handleChange(true, 'emailFieldFocus')}
                        // onBlur={() => handleChange(false, 'emailFieldFocus')}
                        // onChangeText={(text) => handleChange(text, 'email')}
                        onSubmitEditing={event => {
                          addressField.focus();
                        }}
                    />  
           {/* <View
            style={[
              AppStyles.signUptile,
              {
                ...boxShadow('black', {height: 1, width: 1}, 2, 0.2),
                borderRadius: moderateScale(48) / 2,
              },
            ]}>
            <TouchableOpacity
              onPress={() => setVisible(true)}
              disabled

              style={{
                flex: windowWidth > 360 ? 0.35 : 0.38,
                flexDirection: 'row',
              }}>
              <Flag
                countryCode={state.countryName}
                flagSize={16}
                style={{marginRight: 0}}
              />
              <Text style={AppStyles.signUpcountryText}>
                {state.countryCode}{' '}
              </Text>
              <Image
                source={Images.selectnumber}
                style={AppStyles.signUpselectnumber}
              />
            </TouchableOpacity>
            <View style={AppStyles.signUpphoneInput}></View>

            <TextInput
              ref={ref => {
                phoneRef = ref;
              }}
              initialCountry={state.countryName}
              returnKeyType={'done'}
              value={state.mobileNumber}
              placeholder={'Phone Number'}
              editable={false}
              viewTextStyle={[
                AppStyles.signUptile,
                {
                  flex: 0.5,
                  borderWidth: 0,
                  borderColor: 'white',
                  height: moderateScale(48),
                  ...boxShadow('transparent', {height: 0, width: 0}, 0, 0),
                },
              ]}
              textInputStyle={[
                {
                  height: moderateScale(48),
                },
              ]}
              onChangeText={text => handleChange(text, 'phone')}
              offset={scale(28)}
            />
          </View>
           */}
          {/* <View
            style={[
              AppStyles.signUptile,
              {
                borderRadius: moderateScale(48) / 2,
              },
            ]}> */}
            {/* <View style={AppStyles.signUpphoneInput}></View>
            <View style={AppStyles.signUpdropTextView}>
              <Text style={AppStyles.signUpcountryText}>
                {state.countryCode}{' '}
              </Text>
              <Image
                source={Images.selectnumber}
                style={AppStyles.signUpselectnumber}
              />
            </View>

            <PhoneInput
              ref={ref => {
                phoneRef = ref;
              }}
              disabled
              initialCountry={state.countryName}
              returnKeyType={'done'}
              value={state.mobileNumber}
              flagStyle={AppStyles.signUpflag}
              // onChangePhoneNumber={phone => handleChange(phone, 'mobileNumber')}
              // onSelectCountry={countryCode => getCountryCode(countryCode)}
              textProps={{
                returnKeyType: 'done',
                placeholder: 'Phone Number',
                editable: false,
                placeholderTextColor: 'rgba(62,62,62,0.55)',
              }}
              textStyle={[
                AppStyles.phoneSearchSignpTextInput,
                {
                  marginLeft: windowWidth / 10,
                  borderRadius:moderateScale(48)/2

                },
              ]}
              offset={scale(28)}
            />
          </View> */}
          <View style={{height: verticalScale(24)}} />
          {/*************** Address field *******************/}
          <TextInput
            label={''}
            inputMenthod={input => {
              addressField = input;
            }}
            placeholder={'Address'}
            multiline
            placeholderTextColor="rgba(62,62,62,0.55)"
            returnKeyType="next"
            // onPress={() => navigation.navigate('AddressModal', {
            //     setHandleAddress: (address, placeId) => setHandleAddress(address, placeId)
            // })}
            keyboardType="default"
            autoCorrect={false}
            value={state.address}
            // onTouchStart={() => navigation.navigate('AddressModal', {
            //     setHandleAddress: (address, placeId) => setHandleAddress(address, placeId)
            // })}
            textInputStyle={{
              textAlignVertical: 'center',
              height:'auto',
              paddingTop:Platform.OS == 'ios' ? moderateScale(12):0,
              minHeight: moderateScale(48),
            }}
            autoCapitalize="none"
            editable={false}
            blurOnSubmit={false}
            leftIcon={Images.address2}
            isFocused={state.addressFieldFocus}
            viewTextStyle={AppStyles.viewTextStyle}
            underlineColorAndroid="transparent"
          />
          <View style={{height: verticalScale(24)}} />
        </View>
        <View style={{height: verticalScale(24)}} />
        <BottomView
          onPressRight={() => LogoutAction()}
          onPressLeft={() => navigation.navigate('ChangePassword')}
        />
      </ScrollView>
      {visible && (
        <CountryPicker
          {...{
            onSelect,
          }}
          withFilter
          ref={ref => (countryRef = ref)}
          onClose={() => setVisible(false)}
          containerButtonStyle={{marginTop: 8}}
          visible={visible}
        />
      )}
      {/*************** Bottom View *******************/}
    </View>
  );
};

export default Profile;
