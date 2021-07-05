import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
  Image,
  Alert,
  Keyboard,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {Validation, Methods} from '_utils';
import {useDispatch, useSelector} from 'react-redux';

import {Text, TextInput, Button, Label, Header} from '_atoms';
import Geolocation from 'react-native-geolocation-service';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {Images} from '_utils';
import {Line} from '_molecules';
import MapView, { Marker } from "react-native-maps";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Typography, Colors, Mixins, AppStyles} from '_styles';
let {padding, boxShadow} = Mixins;
import Geocoder from 'react-native-geocoding';
import config from '../../../config';

Geocoder.init(config.GOOGLE_MAP_KEY);
const GOOGLE_MAPS_APIKEY = config.GOOGLE_MAP_KEY;
import {addAddressRequest} from '../../../store/modules/address/actions';

// Component
const AddAddressModal = ({navigation, route}) => {
  let timer;
  const mapRef = useRef(null);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    predictions: [],
    showSuggestion: false,
    sourceLocation: '',
    addressModel: false,
    modalVisible: false,
    curLatitude: 37.78825,
    curLongitude: -122.4324,
    addressType: 'Home',
  });
  useEffect(() => {
    let address = route.params?.address ?? '';
    if (Platform.OS === 'android') {
      requestLocationPermission(address);
    } else {
      getCurrentLocation(address);
    }
  }, []);

  /****************************** Validation *************************************/
  const ValidationRules = () => {
    let {address, area = null, houseNo = null, landmark = null} = state;
    let code = 'en';
    return [
      {
        field: address,
        name: 'Address',
        rules: 'required|no_space',
        lang: code,
      },
      {
        field: area,
        name: 'Area',
        rules: 'required|no_space',
        lang: code,
      },
      {
        field: houseNo,
        name: 'House No',
        rules: 'required|no_space',
        lang: code,
      },
      {
        field: landmark,
        name: 'Landmark',
        rules: 'required|no_space',
        lang: code,
      },
    ];
  };
  /****************************** Api Function  *************************************/
  const pressButton = () => {
    let {curLatitude,
      curLongitude,
      addressType,
      address, area = '', 
      houseNo = '', landmark = ''} = state;
    let validation = Validation.validate(ValidationRules());
    let { showToast } = Methods
    if (validation.length != 0) {
      showToast(validation[0].message, 'danger')
    } else {
     let data ={
      "address" : address,
      "addressLocation" : {"lat": curLatitude, "long":curLongitude},
      "area" : area,
      "houseNo": houseNo,
      "landmark" :landmark,
      "addressType" : addressType
      }
      console.log(data,"data")
      dispatch(addAddressRequest(data,navigation))
    }
  }
  /****************************** Function Main  *************************************/
  const requestLocationPermission = async address => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: '',
          message: 'Allow to access current location',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
         getCurrentLocation(address);
        //console.log('You can use the location');
      } else {
        //console.log('location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const getCurrentLocation = async address => {
    await Geolocation.getCurrentPosition(
      position => {
        Geocoder.from(position.coords.latitude, position.coords.longitude)
          .then(json => {
            var addressComponent = json.results[0].formatted_address;
            setState(prevState => ({
              ...prevState,
              curLatitude: position.coords.latitude,
              curLongitude: position.coords.longitude,
              address: addressComponent,
            }));
          })
          .catch(error => console.log(error));
      },
      error => {
        setState(prevState => ({
          ...prevState,
          error: error.message,
        }));
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 10000,
        // distanceFilter: 10,
      },
    );
  };
  /****************************** Function Main  *************************************/
  const handleChange = (value, name) => {
    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  const setHandleAddress = (address, placeId, location) => {
    console.log(location, 'location');
    setState(prevState => ({
      ...prevState,
      ['address']: address,
      ...location,
    }));
    if (Platform.OS == 'ios') {
      mapRef.current.animateToRegion(
        {latitude: location.curLatitude, longitude: location.curLongitude},
        100,
      );
    }
    // mapRef.animateToRegion({
    //   latitude: location.curLatitude,
    //   longitude: location.curLongitude,
    // });
  };
  const convertToAddress = locationLatLong => {
    Geocoder.from(locationLatLong.latitude, locationLatLong.longitude)
      .then(json => {
        const currentAddress = json.results[0].formatted_address;
        let {lat, lng} = json.results[0].geometry.location;
        setState(prevState => ({
          ...prevState,
          curLatitude: lat,
          curLongitude: lng,
          address: currentAddress,
        }));
      })
      .catch(error => console.warn(error));
  };

  const logDrag = (eventName, e) => {
    if (
      e &&
      e.nativeEvent &&
      e.nativeEvent.coordinate.latitude &&
      e.nativeEvent.coordinate.longitude &&
      eventName == 'onDragend'
    ) {
      const locationLatLong = {
        latitude: e.nativeEvent.coordinate.latitude,
        longitude: e.nativeEvent.coordinate.longitude,
      };
      convertToAddress(locationLatLong);
    }
  };
  /****************************** Render Main  *************************************/

  return (
    <View style={[{flex: 1, backgroundColor: Colors.white}]}>
        <ScrollView
    style={{backgroundColor: Colors.white }}
    keyboardShouldPersistTaps={'never'}>
      {/*************************** Map View  ********************/}
      <MapView
        // provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.mapView}
        ref={mapRef}

        // showsMyLocationButton={true}
        zoomControlEnabled
        zoomEnabled={true}
        region={{
          latitude: state.curLatitude,
          longitude: state.curLongitude,
          latitudeDelta: 0.009,
          longitudeDelta: 0.001,
        }}>
        {/* <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            paddingTop: moderateScale(24),
            paddingHorizontal: moderateScale(16),
          }}>
          <Image
            source={Images.back}
            resizeMode={'contain'}
            style={styles.tileIcon}
          />
        </TouchableOpacity> */}
        <MapView.Marker
          coordinate={{
            latitude: state.curLatitude,
            longitude: state.curLongitude,
          }}
          key={'0'}
          onSelect={e => logDrag('onSelect', e)}
          onDrag={e => logDrag('onDrag', e)}
          onDragStart={e => logDrag('onDragStart', e)}
          onDragEnd={e => {
            logDrag('onDragend', e);
          }}
          onPress={e => logDrag('onPress', e)}
          draggable>
          <Image
            resizeMode="contain"
            source={Images.addressprofile}
            style={{height: 30, width: 30}}
          />
        </MapView.Marker>
      </MapView>
      <TouchableOpacity
          hitSlop={{
            right: 25,
            left: 25,
            top: 25,
            bottom: 25,
          }}
          style={{position: 'absolute', top: 32}}
          onPress={() => navigation.goBack()}>
          <View style={{paddingHorizontal: 24, marginTop: 4}}>
            <Image
              source={Images.backblack}
              style={styles.backIcon}
              resizeMode={'contain'}
            />
          </View>
        </TouchableOpacity>
      {/*************************** Location input  ********************/}
      <View style={{flex: 1, marginTop: moderateScale(24)}}>
        <Label
          labelStyle={{
            fontSize: Typography.normalize(18),
            paddingHorizontal: moderateScale(12),
          }}
          title={'Set Delivery Location'}
        />
        <View style={{height: verticalScale(4)}} />
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('AddressModal', {
              setHandleAddress: (address, placeId, location) =>
                setHandleAddress(address, placeId, location),
            })
          }>
          <Label
            labelStyle={{
              paddingHorizontal: moderateScale(12),
              color: Colors.textColor,
              fontWeight: 'normal',
              fontSize: Typography.normalize(14),
            }}
            subTitle={state.address}
            subLabelStyle={{
              paddingHorizontal: moderateScale(12),
              color: Colors.black,
              fontSize: Typography.normalize(13),
            }}
            title={'Location'}
          />
        </TouchableOpacity>

        <Line />
        {/*************** Achhount Holder Name *******************/}

        <TextInput
          label={''}
          inputMenthod={input => {
            areaField = input;
          }}
          placeholder={'Area'}
          placeholderTextColor="rgba(62,62,62,0.55)"
          returnKeyType="next"
          keyboardType="default"
          autoCorrect={false}
          textInputStyle={AppStyles.addschTextInputStyle}
          autoCapitalize="none"
          blurOnSubmit={false}
          viewTextStyle={AppStyles.viewaddaddStyle}
          underlineColorAndroid="transparent"
          onChangeText={text => handleChange(text, 'area')}
          onSubmitEditing={event => {
            landMarkField.focus();
          }}
        />
        <View style={{height: verticalScale(4)}} />

        <TextInput
          label={''}
          inputMenthod={input => {
            landMarkField = input;
          }}
          placeholder={'House No'}
          placeholderTextColor="rgba(62,62,62,0.55)"
          returnKeyType="next"
          keyboardType="default"
          autoCorrect={false}
          textInputStyle={AppStyles.addschTextInputStyle}
          autoCapitalize="none"
          blurOnSubmit={false}
          viewTextStyle={AppStyles.viewaddaddStyle}
          underlineColorAndroid="transparent"
          onChangeText={text => handleChange(text, 'houseNo')}
          onSubmitEditing={event => {
            specialField.focus();
          }}
        />

        {/*************** Achhount Holder Name *******************/}
        <View style={{height: verticalScale(4)}} />
        <TextInput
          label={''}
          inputMenthod={input => {
            specialField = input;
          }}
          placeholder={'Landmark'}
          placeholderTextColor="rgba(62,62,62,0.55)"
          returnKeyType="next"
          keyboardType="default"
          autoCorrect={false}
          autoCapitalize="none"
          textInputStyle={AppStyles.addschTextInputStyle}
          blurOnSubmit={false}
          viewTextStyle={AppStyles.viewaddaddStyle}
          underlineColorAndroid="transparent"
          onChangeText={text => handleChange(text, 'landmark')}
          onSubmitEditing={event => {
            Keyboard.dismiss();
          }}
        />
        <View style={{height: verticalScale(32)}} />
        <View
          style={[
            AppStyles.rowSpaceBetween,
            {paddingHorizontal: moderateScale(16)},
          ]}>
          <TouchableOpacity
            onPress={() => handleChange('Home', 'addressType')}
            style={
              state.addressType == 'Home'
                ? AppStyles.activesaveAddress
                : AppStyles.inactivesaveAddress
            }>
            <Text style={state.addressType == 'Home' && {color: 'white'}}>
              Home
            </Text>
          </TouchableOpacity>
          <View style={{flex: 0.05}} />

          <TouchableOpacity
            onPress={() => handleChange('Office', 'addressType')}
            style={
              state.addressType == 'Office'
                ? AppStyles.activesaveAddress
                : AppStyles.inactivesaveAddress
            }>
            <Text style={state.addressType == 'Office' && {color: 'white'}}>
              Office
            </Text>
          </TouchableOpacity>
          <View style={{flex: 0.05}} />

          <TouchableOpacity
            onPress={() => handleChange('Other', 'addressType')}
            style={
              state.addressType == 'Other'
                ? AppStyles.activesaveAddress
                : AppStyles.inactivesaveAddress
            }>
            <Text style={state.addressType == 'Other' && {color: 'white'}}>
              Other
            </Text>
          </TouchableOpacity>
          <View style={{flex: 0.4}} />
        </View>
      </View>
      </ScrollView>
      <View
        style={{
          justifyContent: 'center',
          paddingHorizontal: moderateScale(16),
          flex: 0.5,
          zIndex: 10,
        }}>
        <Button
          buttonStyle={{borderRadius: 4}}
          onPress={() => pressButton()}
          title={'Save Address'}
        />
      </View>
    </View>
  );
};

export default AddAddressModal;

const styles = StyleSheet.create({
  tileIcon: {
    height: scale(16),
    width: scale(16),
    marginLeft: 0,
  },
  tile: {
    backgroundColor: 'transparent',
    width: 'auto',
    paddingHorizontal: moderateScale(24),
    paddingRight: moderateScale(16),

    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1.0,
    borderColor: Colors.borderColor,
  },
  searchTextInput: {
    flex: 1,
    height: moderateScale(48),
    fontSize: Typography.normalize(16),
    borderColor: 'gray',
    borderRadius: 0,
  },
  mapView: {
    width: '100%',
    height: wp('65%'),
  },
});
