import React, { useState, useRef, useEffect, } from 'react';
import { View, TextInput, PermissionsAndroid, Platform, TouchableOpacity, ImageBackground, Image, Alert, TouchableHighlight, Keyboard, ScrollView, StyleSheet } from 'react-native';
import { Text, Button, Header } from '_atoms'
import Geolocation from 'react-native-geolocation-service';
import Entypo from 'react-native-vector-icons/Entypo'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { Images } from '_utils'
import { Typography, Colors, Mixins, AppStyles } from '_styles';
let { padding, boxShadow } = Mixins
import Geocoder from 'react-native-geocoding';
import config from '../../../config';
Geocoder.init(config.GOOGLE_MAP_KEY);
const GOOGLE_MAPS_APIKEY = config.GOOGLE_MAP_KEY;
// Component 
const AddressModal = ({ navigation, route }) => {
    let timer;
    const [state, setState] = useState({
        predictions: [],
        showSuggestion: false,
        sourceLocation: '',
        addressModel: false,
        modalVisible: false,
        curLatitude: '',
        curLongitude: '',
    });
    useEffect(() => {
        let address = route.params?.address ?? '';
        if (Platform.OS === 'android') {
            requestLocationPermission(address);
        } else {
            getCurrentLocation(address)
        }
    }, [])

    /****************************** Function Main  *************************************/
    const requestLocationPermission = async (address) => {
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
                getCurrentLocation(address)
                //console.log('You can use the location');
            } else {
                //console.log('location permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    }
    const getCurrentLocation = async (address) => {
        await Geolocation.getCurrentPosition(
            position => {
                if (address) {
                    debugger
                    onChangeSource(address)
                } else {
                    setState(prevState => ({
                        ...prevState,
                        curLatitude: position.coords.latitude,
                        curLongirrtude: position.coords.longitude,
                    }))
                    Geocoder.from(position.coords.latitude, position.coords.longitude)
                        .then(json => {
                              var addressComponent = json.results[0].formatted_address;
                             let searchString
                              if(addressComponent.length > 18){
                                searchString =addressComponent.substring(0, 18);
                              }else{
                                searchString = addressComponent
                              }                  
                              onChangeSource(searchString)
                        })
                        .catch(error => console.log(error));
                }


            },
            error => {
                setState(prevState => ({
                    ...prevState, error: error.message
                }))
            },
            {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 10000,
                // distanceFilter: 10,
            },
        );
    };

    const googleAutocomplete = async (Location, curLat, curLong) => {
        const apiUrl =
            'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' +
            Location +
            '&key=' +
            GOOGLE_MAPS_APIKEY +
            '&location=' +
            curLat +
            ',' +
            curLong +
            '&radius=' +
            1000;
        const result = await fetch(apiUrl);
        const json = await result.json();
        console.log(`...........................json==>`, json)
        return json;
    };

    const onChangeSource = async (sourceLocation) => {
        console.log('source location', sourceLocation)
        setState(prevState => ({
            ...prevState,
            tentativePrice: '',
            showSuggestionDest: false,
            sourceLocation: sourceLocation,
        }));
        var json = await googleAutocomplete(
            sourceLocation,
            state.curLatitude,
            state.curLongitude,
        );
        try {
            setState(prevState => ({
                ...prevState,
                predictions: json.predictions,
                showSuggestion: true,
                myaddress_list: json.predictions
            }));
            if (json.predictions.length == 0) {
                setState(prevState => ({
                    ...prevState,
                    showSuggestion: false,
                }));
            }
        } catch (err) {
            showAlert(err.message, 300);
        }
    }

    const setSourceLocation = async (placeId, description) => {
        Keyboard.dismiss();
        setState(prevState => ({
            ...prevState,
            sourceLocation: description,
            showSuggestion: false,
            selSourcePlaceId: placeId,
            address: description,
        }));
        try {
            let currentlocation = {}
            const json = await Geocoder.from(description)
            debugger
            var location = json.results[0].geometry.location;
            currentlocation = {
                curLatitude: location.lat,
                curLongitude: location.lng,
            }
            debugger
            if (route.params && route.params.setHandleAddress) {
                let { setHandleAddress } = route.params
                setHandleAddress(description, placeId,currentlocation)
                navigation.goBack()
            }

        } catch (error) {
            alert(error.message)
        }

    }

    const showAlert = (message, duration) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            Alert.alert(message);
        }, duration);
    }

    /****************************** Render Main  *************************************/
    const predictions = state && state.predictions.map(prediction => (
        <TouchableHighlight
            style={{
                paddingVertical: 5,
                borderBottomWidth: 1.0,
                borderColor: Colors.borderColor,
                backgroundColor: 'white',
                paddingHorizontal: moderateScale(16),
                height: 'auto',
            }}
            onPress={() =>
                setSourceLocation(prediction.place_id, prediction.description)
            }>
            <Text style={{ margin: 10 }}
                key={prediction.id}>
                {prediction.description}
            </Text>
        </TouchableHighlight>
    ));
    return <View style={[{ flex: 1, backgroundColor: Colors.white }]}>
        <Header
            leftText
            image={Images.back}
            onPressLeft={() => navigation.goBack()}
            style={[boxShadow('trasparent', {}, 0)]}
            title={'Enter Address'}
            textStyle={{ textAlign: 'center' }}
        />
        <View style={styles.tile}>
            <View style={{ flex: 0.1 }}>
                <Image
                    resizeMode="contain"
                    style={styles.tileIcon}
                    source={Images.address2}
                />
            </View>

            <TextInput
                // onTouchStart={() => openAddressModel()}
                placeholder="Search location ..."
                placeholderTextColor="grey"
                onChangeText={sourceLocation =>
                    onChangeSource(sourceLocation)
                }
                multiline
                value={state.sourceLocation}
                style={[styles.searchTextInput, {
                    height: 'auto',
                    paddingTop: Platform.OS == 'ios' ? moderateScale(12) : 0,
                    minHeight: moderateScale(48),
                }]}></TextInput>
            {state.sourceLocation ? <TouchableOpacity
                onPress={() => {
                    onChangeSource('')
                    setState({
                        ...state,
                        sourceLocation: ''
                    })
                }
                }
                style={{
                    flex: 0.1,
                    justifyContent: 'flex-end'
                }}>
                <Entypo
                    resizeMode="contain"
                    size={28}
                    color={'black'}
                    name={'cross'}
                />
            </TouchableOpacity> : null}
        </View>
        {state.showSuggestion ? (
            <View
                style={{
                    flex: 1,
                    backgroundColor: 'white',
                }}>
                {predictions}
            </View>
        ) : null}
    </View>
}

export default AddressModal;

const styles = StyleSheet.create({
    tileIcon: {
        height: scale(16), width: scale(16),
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
})
