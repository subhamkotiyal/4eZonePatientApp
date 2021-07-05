// import React, { useState, useRef, useEffect, } from 'react';
// import { View, TouchableOpacity, ImageBackground, FlatList, ScrollView, Keyboard } from 'react-native';
// import { Text, Button, Header } from '_atoms'
// import { ListEmptyComponent, ListItem } from '_molecules'
// import { useDispatch, useSelector } from "react-redux";

// import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
// import { Images } from '_utils'
// import { Typography, Colors, Mixins, AppStyles } from '_styles';
// let { boxShadow, padding } = Mixins
// import {
//   getNearbyGymsRequest
// } from '../../../store/modules/gyms/actions'
// import RenderMap from './mapView'
// // Component 
// const Gyms = ({ navigation, route }) => {
//   const [isMapView, setToggleMapView] = useState(false)
//   const dispatch = useDispatch()
//   const { nearbyGyms, } = useSelector(state => ({
//     nearbyGyms: state.neabyGymReducer.nearbyGyms,
//   }));
//   useEffect(() => {
//     getNearbyGyms()
//   }, [])

//   /****************************** Api Function *************************************/
//    const getNearbyGyms = () => {
//     let { locations } = route.params
//     if (locations) {
//       let { curLatitude, curLongitude } = locations
//       //payload
//       let data = {
//         "source": {
//           "startLocation": {
//             "lat": curLatitude,
//             "lng": curLongitude
//           }
//         }
//       }
//       dispatch(getNearbyGymsRequest(data))
//     }
//   }
//   /****************************** Function Main *************************************/

//   /****************************** Render Main  *************************************/
//   return <View style={[{ flex: 1, backgroundColor: Colors.white }]}>
//     <Header
//       leftText
//       image={Images.back}
//       onPressRight={() => setToggleMapView(!isMapView)}
//       onPressLeft={() => navigation.goBack()}
//       style={[boxShadow('trasparent', {}, 0), {
//         paddingHorizontal: moderateScale(16)
//       }]}
//       title={'Near By Gym'}
//       rightImage={isMapView ? Images.listround : Images.nearby}

//       textStyle={{ textAlign: 'center' }}
//     />
//     <View style={{
//       flex: 1, backgroundColor: Colors.white, paddingTop: scale(12)
//     }}>
//       {!isMapView && <FlatList
//         data={nearbyGyms}
//         showsVerticalScrollIndicator={false}
//         ListEmptyComponent={() => <ListEmptyComponent message={'No gyms found!'} />}
//         renderItem={({ item, index }) => <ListItem
//           item={item}
//           index={index}
//           isTrainer={false}
//           onPress={() => navigation.navigate('Details', {
//             from: 'gyms',
//             itemDetail:item
//           })}
//         />}
//         style={{ backgroundColor: Colors.white }}
//         showsHorizontalScrollIndicator={false}
//         keyExtractor={(item, index) => 'store' + index}
//       />}
//       {isMapView && <RenderMap 
//       locations={route.params.locations}
//         nearbyData={nearbyGyms}
//       />}

//     </View>

//   </View>
// }

// export default Gyms;