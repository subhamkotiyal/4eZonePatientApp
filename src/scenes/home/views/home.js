import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  PermissionsAndroid,
  FlatList,
  ScrollView,
  Image,
  ImageBackground,
  Keyboard,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {ListEmptyComponent} from '_molecules';
import {Configuration} from '_utils';

import {Text, Button, TextInput, Header, SmallIcon, Card, Label} from '_atoms';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {Images} from '_utils';
import {Typography, Colors, Mixins, AppStyles} from '_styles';
let {boxShadow, padding, windowWidth, windowHeight} = Mixins;
import config from '../../../config';

import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
Geocoder.init(config.GOOGLE_MAP_KEY);
import {getAllSpecialistRequest} from '../../../store/modules/specialList/actions';
import {CardImage} from '../templates';

// Component
const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const {specialList, user = {}} = useSelector(state => ({
    specialList: state.specialListReducer.specialList,
    user: state.getProfileReducer.profileData,
  }));
  let WSService = Configuration.getConfiguration('Socket');

  const [locations, setLocationState] = useState({
    sourceLocation: '',
    curLatitude: '',
    curLongitude: '',
  });
  useEffect(() => {
    if (Platform.OS === 'android') {
      requestLocationPermission();
    } else {
      getCurrentLocation();
    }
  }, []);

  useEffect(() => {
    getAllSpecialist();
  }, []);
  useEffect(() => {
    orderReceiveFromCustomer();
  }, []);
  /****************************** Function Main  *************************************/
   // Message recive from server
   const orderReceiveFromCustomer = () => {
     if(WSService){
      WSService.on('order_customer_socket', data => {
        debugger
           console.log(data,"response scoekt data")
        });

     }
    
  
  };
  const getAllSpecialist = () => {
    dispatch(getAllSpecialistRequest());
  };
  /****************************** Location  Function  *************************************/
  const setHandleAddress = (address, placeId, location) => {
    setLocationState(prevState => ({
      ...prevState,
      ['sourceLocation']: address,
      ['placeId']: placeId,
      ...location,
    }));
  };
  const requestLocationPermission = async () => {
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
        getCurrentLocation();
        //console.log('You can use the location');
      } else {
        //console.log('location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const getCurrentLocation = async () => {
    await Geolocation.getCurrentPosition(
      position => {
        setLocationState(prevState => ({
          ...prevState,
          curLatitude: position.coords.latitude,
          curLongitude: position.coords.longitude,
        }));
        Geocoder.from(position.coords.latitude, position.coords.longitude)
          .then(json => {
            var addressComponent = json.results[0].formatted_address;
            setLocationState(prevState => ({
              ...prevState,
              sourceLocation: addressComponent,
              selSourcePlaceId: json.results[0].place_id,
            }));
          })
          .catch(error => console.log(error));
      },
      error => {
        alert(error.message);
        setLocationState(prevState => ({
          ...prevState,
          error: error.message,
        }));
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 10000,
      },
    );
  };
  /****************************** Render Child  *************************************/
  const HomeHeader = ({locations}) => {
    return (
      <ImageBackground
        resizeMode={'stretch'}
        style={{
          height: windowHeight > 736 ? windowHeight / 2.8 : windowHeight / 2.5,
          width: '100%',
        }}
        source={Images.profilebg}>
        <View
          style={[
            AppStyles.rowSpaceBetween,
            {
              paddingVertical: scale(8),
              paddingHorizontal: scale(16),
            },
          ]}>
          <TouchableOpacity
            hitSlop={{
              left: 25,
              right: 25,
              top: 25,
              bottom: 25,
            }}
            style={{paddingTop: 4}}
            onPress={() => navigation.openDrawer()}>
            <SmallIcon
              style={{height: moderateScale(16), width: moderateScale(28)}}
              source={Images.hamburger}
            />
          </TouchableOpacity>
          <View style={{flex: 0.8}}>
            <Text
              h6
              style={{
                color: 'rgba(255,255,255,0.4)',
                fontSize: Typography.normalize(13),
              }}>
              LOCATION
            </Text>
            <TouchableOpacity
              hitSlop={{
                left: 25,
                right: 25,
                top: 25,
                bottom: 25,
              }}
              style={{flexDirection: 'row'}}
              onPress={() =>
                navigation.navigate('AddressModal', {
                  setHandleAddress: (address, placeId, location) =>
                    setHandleAddress(address, placeId, location),
                })
              }>
              <Text
                p
                style={{
                  color: Colors.white,
                  fontSize: Typography.normalize(15),
                  paddingTop: 2,
                }}
                numberOfLines={2}>
                {locations && locations.sourceLocation
                  ? `${locations.sourceLocation} ${'  '} `
                  : 'Location...  '}
                <SmallIcon
                  style={{height: moderateScale(12), width: moderateScale(12)}}
                  source={Images.edit}
                />
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('Profile')}
            style={{
              flex: 0.1,
              justifyContent: 'flex-start',
              alignItems: 'center',
              bottom:4
            }}>
            <Image
              style={{height: moderateScale(42),
                 width: moderateScale(42)}}
              source={Images.userround}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            paddingHorizontal: moderateScale(20),
            paddingVertical: moderateScale(8),
          }}>
          <Text
            p
            style={{
              color: 'rgba(255,255,255,0.96)',
              fontSize: Typography.normalize(26),
            }}>
            Hey {user && user.name ? user.name : ''} ,
          </Text>
          <Text
            style={{
              color: 'rgba(255,255,255,0.9)',
              fontSize: Typography.normalize(12),
            }}>
            What does concern you ?
          </Text>
          <View
            style={[
              AppStyles.viewTextStyle,
              {
                borderRadius: moderateScale(48) / 6,
                backgroundColor: '#2C7FB9',
                height: moderateScale(42),
                alignItems: 'center',
                marginTop: moderateScale(24),
                flexDirection: 'row',
                paddingHorizontal: moderateScale(16),
              },
            ]}>
            <View style={{flex: 0.1}}>
              <Image
                source={Images.searchhome}
                style={{height: moderateScale(18), width: moderateScale(16)}}
              />
            </View>
            <TouchableOpacity
              style={{flex: 0.9}}
              onPress={() => navigation.navigate('SearchSpecialList',{
                locations:locations
              })}>
              <Text style={{color: 'rgba(255,255,255,0.4)'}}>
                Search Specialist....
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  };

  /****************************** Render Main  *************************************/
  return (
    <View style={[{flex: 1, backgroundColor: Colors.white}]}>
      <ScrollView
            showsVerticalScrollIndicator={false}

      contentContainerStyle={[{backgroundColor: 'white'}]}>
        <HomeHeader locations={locations} />

        <View
          style={{
            flex: 1,
            paddingHorizontal: moderateScale(16),
          }}>
          <Label
            labelStyle={{fontSize: Typography.normalize(24)}}
            title={'Doctor Specialist'}
          />
          <View style={{height: moderateScale(16)}} />
          <FlatList
            numColumns={2}
            style={{backgroundColor: 'rgba(246, 250, 253, 0.4)'}}
            data={specialList}
            ListEmptyComponent={() => (
              <ListEmptyComponent message={'No data found!'} />
            )}
            renderItem={({item, index}) => (
              <CardImage
                onPress={() =>
                  navigation.navigate('Doctors', {
                    specialistId: item._id,
                    locations: locations,
                    specialistName: item.specialistName,
                  })
                }
                item={item}
                index={index}
              />
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
