import React, { useState, useRef, useEffect, } from 'react';
import {
    StyleSheet,
    View, TouchableHighlight,
    Image,
    TouchableOpacity,
    Platform,
    Dimensions,
} from 'react-native';
import { Text, Button, Header, SmallIcon, Label } from '_atoms'
import { Typography, Colors, Mixins, AppStyles } from '_styles';
import { Images } from '_utils'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MapView, { Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import { moderateScale } from 'react-native-size-matters';
import config from '../../../config';

Geocoder.init(config.GOOGLE_MAP_KEY);
const timeout = 1000;
let animationTimeout;


/************************Const Value  ************************/
let { boxShadow, padding, windowWidth, windowHeight } = Mixins
let dimensions = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
};
const ASPECT_RATIO = dimensions.width / dimensions.height;
const LATITUDE = 37.78825;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE = -122.4324;
const SPACE = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const DEFAULT_PADDING = {top: 100, right: 100, bottom: 100, left: 100}

export default RenderMap = ({ nearbyData,locations={} }) => {

    /************************Hooks Function  ************************/
    let marker, mapRef;
    let { curLatitude=37.785834, curLongitude=-122.406417 } = locations
    const [state, setState] = useState({ latitude: curLatitude, longitude: curLongitude })
    const [markers, setMarker] = useState([])
    //get and Fit cooordinates
    useEffect(() => {
        if (nearbyData && nearbyData.length > 0) {
            let filterMarker = nearbyData.map((x) => {
                let geoLocationData = x.gymLocation || x.trainerLocation
                return {
                    ...x,
                    coordinates:{
                    latitude: geoLocationData.coordinates[1] - SPACE * 1,
                    longitude: geoLocationData.coordinates[0] - SPACE * 1
                    }
                }
            })
            setMarker(filterMarker)
        }
    }, [nearbyData])
    useEffect(()=>{
        fitAllMarkers()
    },[markers])
    /************************Main Function  ************************/

    const fitAllMarkers = () => {
        console.log(markers,"markers")
        if (markers && markers.length > 0) {
            animationTimeout = setTimeout(() => {
            let allMarkers = markers.map(x=> x.coordinates)
            mapRef.fitToCoordinates(allMarkers, {
                edgePadding: DEFAULT_PADDING,
                animated: true,
            });
        },timeout);

        }
    }
    /************************Render View Function  ************************/
    const noNearByData = () => {
        return (
            <View
                needsOffscreenAlphaCompositing={true}
                style={{
                    flex: 1,
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    position: 'absolute',
                }}>
                <View
                    style={{
                        width: '100%',
                        height: 200,
                        backgroundColor: 'white',
                        alignItems: 'center',
                        opacity: 1,
                    }}>
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: '500',
                            top: 10,
                        }}>
                        {'Near by location not found'}
                    </Text>
                </View>

            </View>
        );
    };

    const renderMarker = () => {
        return markers.map((marker, i) => (
            <MapView.Marker
                key={i} identifier={`id${i}`} coordinate={marker.coordinates}
                // showCallout
                description={'5 *'}>
                <Image
                    resizeMode="contain"
                    source={Images.locationgym}
                    style={{ height: 30, width: 30 }}
                />
                   <MapView.Callout style={{width:wp('25%')}}>
                    <View style={styles.calloutText}>
                            <Text
                                style={[AppStyles.medium, {
                                    color: 'rgba(0,0,0,0.8)',
                                    lineHeight: 16,
                                    fontSize: Typography.normalize(14),
                                }]}
                            >{marker.name}{`\n`}
                                <Text
                                    style={[AppStyles.medium, {
                                        color: 'rgba(0,0,0,0.8)',
                                        fontSize: Typography.normalize(9),
                                    }]}
                                ><Image source={Images.star}
                                    style={styles.starStyle}
                                    /> 4.5</Text>
                            </Text>
                            </View>
                </MapView.Callout>
            </MapView.Marker>
        ))
    }
    /************************Render Main Function  ************************/
    return (
        <View
            style={{
                flex: 1,
            }}>
            <View style={{ flex: 1 }}>
                {/************ Map View *************/}
                {nearbyData && nearbyData.length > 0 && <View style={styles.container}>
                    <MapView
                        // provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                        style={styles.mapView}
                        ref={ref => {
                            mapRef = ref;
                        }}
                        showsMyLocationButton={true}
                        zoomControlEnabled
                        showsUserLocation={true}
                        zoomEnabled={true}
                        region={{
                            latitude: state.latitude,
                            longitude: state.longitude,
                            latitudeDelta: 0.009,
                            longitudeDelta: 0.001,
                        }}
                    >

                        {renderMarker()}

                    </MapView>
                </View>
                }
                {nearbyData && nearbyData.length == 0 && noNearByData()}
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    mapView: {
        width: '100%',
        height: '100%',
    },
    calloutText: {
        paddingHorizontal: moderateScale(8),
        paddingLeft: 12,
        paddingTop: 6,
    },
    starStyle: {
        height: moderateScale(8),
        width: moderateScale(8),
        //   alignSelf:'center'
    }

});
