import React, { useState, useRef, useEffect, } from 'react';
import { View, TouchableOpacity, Alert, Platform, Image, ScrollView, ImageBackground, Keyboard } from 'react-native';
import { Text, Button, TextInput, SmallIcon, Header } from '_atoms'
import { ListEmptyComponent } from '_molecules'
import PhoneInput from 'react-native-phone-input';
import ImageChooser from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';

import { Validation, Methods } from '_utils'
import CountryPicker, { Flag } from 'react-native-country-picker-modal';

import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { Images } from '_utils'
import { Typography, Colors, Mixins, AppStyles } from '_styles';
import { useDispatch, shallowEqual, useSelector } from "react-redux";
import {
  profileImRequest,
  profileRequest,
} from '../../../store/modules/editProfile/actions';
let { boxShadow, padding, windowWidth, windowHeight } = Mixins
import { ProfileView, BottomView } from '../templates'

// Component 
const EditProfile = ({ navigation, route }) => {
  /****************************** Get Store State & Hooks*************************************/
  const dispatch = useDispatch()
  let emailField, phoneRef, passwordField, nameField, addressField, gymField, contactField
  const { language, profileData } = useSelector(state => ({
    language: state.switchLanguage.language,
    profileData: state.getProfileReducer.profileData,
  }));
  const [state, setState] = useState({
    ...profileData,
    countryName: profileData && profileData.countryName ? profileData.countryName : 'SE',
    countryCode: profileData && profileData.countryCode ? profileData.countryCode : '+46',
  });
  useEffect(() => {
    //getCountryCode()
  }, [])
  /****************************** Validation *************************************/
  const ValidationRules = () => {
    let { name = '', email = '', mobileNumber = '', address = '' } = state;
    let { code } = language;
    return [
      {
        field: name,
        name: 'Name',
        rules: 'required|no_space',
        lang: code,
      },
      {
        field: email,
        name: 'Email',
        rules: 'required|email|no_space',
        lang: code,
      },
      {
        field: mobileNumber,
        name: 'Phone Number',
        rules: 'required|no_space|min:10',
        lang: code
      },
      {
        field: address,
        name: 'Address',
        rules: 'required',
        lang: code
      },

    ];

  };
  const getCountryCode = () => {
    let allCountry = phoneRef.getAllCountries();
    let seletedCountry = allCountry.filter((country, i) => {
      return `+${country.dialCode}` == state.countryCode
    })
    if (seletedCountry && seletedCountry.length > 0) {
      setState(prevState => ({
        ...prevState,
        countryName: seletedCountry[0].iso2
      }));
    }
  }
  /****************************** API Function *************************************/
  const saveProfileData = () => {
    let validation = Validation.validate(ValidationRules());
    let { showToast } = Methods
    if (validation.length != 0) {
      showToast(validation[0].message, 'danger')
    } else {
      const { email, name, mobileNumber, address } = state;
      let profileData = {
        name: name,
        email: email,
        mobileNumber: mobileNumber,
        address: address,

      };
      let data = {
        profileData: profileData,
        isRegister: false,
      };

      console.log('profile data', data)
      dispatch(profileRequest(data, navigation));
    }

  };

  /****************************** Function Main  *************************************/
  const handleChange = (value, name) => {
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const setHandleAddress = (address, placeId, location) => {
    setState(prevState => ({
      ...prevState,
      ['address']: address,
      ['placeId']: placeId,
      ...location,
    }));
  };
  //Add Profile  image
  const profileImagePck = () => {
    try {
      const options = {
        quality: 0.5,
        maxWidth: 500,
        maxHeight: 500,
        storageOptions: {
          skipBackup: true,
        },
      };
      ImageChooser.showImagePicker(options, response => {
        console.log('User cancelled image picker    response===>', response);

        if (response.didCancel) {
          // console.log('User cancelled image picker');
        } else if (response.error) {
          // console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          // console.log('User tapped custom button: ', response.customButton);
        } else {
          resize(response.uri);
          // this.saveImage(source);
        }
      });
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  };

  //Resize Image
  const resize = sourceURI => {
    ImageResizer.createResizedImage(sourceURI, 300, 300, 'PNG', 80)
      .then(({ uri }) => {
        const source = {
          uri: uri,
          imageName: 'profile',
        };
        setState(prevState => ({
          ...prevState,
          ['profileImage']: source.uri
        }));
        saveImage(source);
      })
      .catch(err => {
        console.log(err);
        return Alert.alert(
          'Unable to upload photo',
          // 'Check the console for full the error message',
        );
      });
  };
  //Save Image
  const saveImage = data => {
    const profiledata = new FormData();
    let ext = /[^.]+$/.exec(data.uri);

    profiledata.append('profileImage', {
      uri:
        Platform.OS === 'android' ? data.uri : data.uri.replace('file://', ''),
      type: 'image/jpeg',
      name: `profile.${ext}`,
    });
    dispatch(profileImRequest(profiledata));
  };
  /****************************** Render Main  *************************************/
  return <View style={[{ flex: 1, backgroundColor: 'white' }]}>

    {/*************** Backgroud Header *******************/}
    <Header
      leftText
      image={Images.backwhite}
      onPressLeft={() => navigation.goBack()}
      onPressRight={() => navigation.navigate('EditProfile')}
      rightStyle={{ flexDirection: 'row' }}
      style={[
        boxShadow('trasparent', {}, 0),
        {
          paddingHorizontal: moderateScale(16),
          backgroundColor: '#499FD2',
        },
      ]}
      title={'Edit Profile'}
      textStyle={{ textAlign: 'center', color: 'white' }}
    />
    <Image
      source={Images.profilebg}
      resizeMode={'stretch'}
      style={{
        width: '100%',
        height: '20%'
      }} />
    <ProfileView fromEdit
      user={state}
      onOpenImage={() => profileImagePck()}
    />
    <View style={{ height: verticalScale(24) }} />

    {/*************** Profile Header *******************/}
    <ScrollView
      showsVerticalScrollIndicator={false}

      contentContainerStyle={[padding(24, 24, 8, 24),
      ]}
      style={{ backgroundColor: 'transparent', }} keyboardShouldPersistTaps={'never'}>

      <View style={{ height: moderateScale(32) }} />
      <View style={{ flex: 0.5, }}>
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
          value={state.name}
          leftIcon={Images.nameIcon}
          viewTextStyle={AppStyles.viewTextStyle}
          underlineColorAndroid="transparent"
          isFocused={state.nameFieldFocus}
          onFocus={() => handleChange(true, 'nameFieldFocus')}
          onBlur={() => handleChange(false, 'nameFieldFocus')}
          onChangeText={(text) => handleChange(text, 'name')}
          onSubmitEditing={event => {
            emailField.focus();
          }}
        />
        <View style={{ height: verticalScale(24) }} />
        {/*************** Email field *******************/}
        <TextInput
          label={''}
          inputMenthod={input => {
            emailField = input;
          }}
          placeholder={'Email'}
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
          editable={false}
          onFocus={() => handleChange(true, 'emailFieldFocus')}
          onBlur={() => handleChange(false, 'emailFieldFocus')}
          onChangeText={(text) => handleChange(text, 'email')}
          onSubmitEditing={event => {
            phoneRef.focus();
          }}
        />
        <View style={{ height: verticalScale(24) }} />
        {/*************** Phone Input field *******************/}
        <TextInput
          label={''}
          inputMenthod={input => {
            phoneRef = input;
          }}
          placeholder={'Mobile Number'}
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
          </View> */}
        <View style={{ height: verticalScale(24) }} />
        {/*************** Address field *******************/}
        <TextInput
          label={''}
          inputMenthod={input => {
            addressField = input;
          }}
          placeholder={'Address'}
          placeholderTextColor="rgba(62,62,62,0.55)"
          returnKeyType="next"
          onPress={() => navigation.navigate('AddressModal', {
            address: state.address,
            setHandleAddress: (address, placeId, location) => setHandleAddress(address, placeId, location)
          })}
          keyboardType="default"
          autoCorrect={false}
          value={state.address}
          onTouchStart={() => navigation.navigate('AddressModal', {
            address: state.address,
            setHandleAddress: (address, placeId, location) => setHandleAddress(address, placeId, location)
          })}
          autoCapitalize="none"
          multiline
          blurOnSubmit={false}
          textInputStyle={{
            textAlignVertical: 'center',
            height: 'auto',
            paddingTop: Platform.OS == 'ios' ? moderateScale(12) : 0,
            minHeight: moderateScale(48),
          }}
          editable={true}
          leftIcon={Images.address2}
          isFocused={state.addressFieldFocus}
          viewTextStyle={AppStyles.viewTextStyle}
          underlineColorAndroid="transparent"
        />
        <View style={{ height: verticalScale(24) }} />
      </View>
      <View style={{ height: verticalScale(48) }} />
      <BottomAbsoluteButton
        customeStyle={{ bottom: 0 }}
        image={Images.tick}
        onPress={() => saveProfileData()} />
    </ScrollView>


    {/*************** Bottom View *******************/}

  </View>
}

export default EditProfile;