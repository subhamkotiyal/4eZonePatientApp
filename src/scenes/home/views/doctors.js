import React, { useState, useRef, useEffect, } from 'react';
import { View, TouchableOpacity, FlatList, ImageBackground, ScrollView, Keyboard } from 'react-native';
import { Text, Button, Header } from '_atoms'
import { ListEmptyComponent,ListFooterComponent, ListItem } from '_molecules'
import { useDispatch, useSelector } from "react-redux";

import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { Images } from '_utils'
import { Typography, Colors, Mixins, AppStyles } from '_styles';
import {
  getNearbyDoctorRequest
} from '../../../store/modules/doctors/actions'
let { boxShadow, padding } = Mixins


// Component 
const Doctors = ({ navigation, route }) => {

  const dispatch = useDispatch()
  const [state,setState] = useState({
    page:0,
    limit:5,
    search:'',
    fetchingStatus:false
  })
  const { nearbyDoctors=[],totalCount=0} = useSelector(state => ({
    nearbyDoctors: state.nearByDoctorReducer.nearbyDoctors.data,
    totalCount: state.nearByDoctorReducer.nearbyDoctors.count,
  }));
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getNearbyDoctor(0)
  }, [])
  const onRefreshList = () => {
    getNearbyDoctor(0)
  };
  /****************************** Api Function *************************************/
  const getNearbyDoctor = (page) => {
    let { locations,specialistId } = route.params
    if (locations) {
      let { curLatitude, curLongitude } = locations
      //payload
      let data ={
        "customerLocation" : {"lat": curLatitude, "lng":curLongitude},
        "sortby" : "rating",
        "page" : page,
        "limit" : state.limit,
        "speciality":specialistId
      }
      debugger
      if(state.search){
        data['search'] = state.search
      }
      dispatch(getNearbyDoctorRequest(data,()=>{
        console.log(res,"rescallBackDoctor")

      }))
    }
  }

  /****************************** Function Render *************************************/
  const ItemSeparator = () => {
    return (
        <View
            style={{
                height: 0.5,
                width: '100%',
                backgroundColor: '#607D8B',
            }}
        />
    );
};
  /****************************** Render Main  *************************************/
  return <View style={[{ flex: 1, backgroundColor: '#F8F8F8' }]}>
    <Header
      leftText
      image={Images.back}
      onPressLeft={() => navigation.goBack()}
      style={[boxShadow('trasparent', {}, 0), {
        paddingHorizontal: moderateScale(16)
      }]}
      title={'Near By Doctor'}

      textStyle={{ textAlign: 'center' }}
    />
    <View style={{
      flex: 1, backgroundColor: '#F8F8F8', paddingTop: scale(12)
    }}>
    <FlatList
        data={nearbyDoctors}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={() => onRefreshList()}
        ListEmptyComponent={() => <ListEmptyComponent message={'No doctors found!'} />}
        renderItem={({ item, index }) => <ListItem
          item={item}
          index={index}
          isTrainer
          onPress={() => navigation.navigate('DoctorDetails', {
            from: 'doctors',
            itemDetail: item,
            ...route.params
          })}
        />}
        onEndReachedThreshold={0.2}
        onEndReached={({ distanceFromEnd }) => { 
          if (Math.ceil(totalCount/state.limit) > state.page) {
            debugger
             setState(prevState => ({
              ...prevState,
              page: state.page + 1,
             }));
            //getNearbyDoctor(state.page + 1) 
            } 

      }}
        initialNumToRender={10}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => 'store' + index}
        itemSeparatorComponent={()=>ItemSeparator()}
        ListFooterComponent={() => (
          <ListFooterComponent fetchingStatus={state.fetchingStatus} />
      )}
     />

      
    </View>


  </View>
}

export default Doctors;