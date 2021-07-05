import React, { useState, useRef, useEffect, } from 'react';
import { View, TouchableOpacity, FlatList, ScrollView, Keyboard } from 'react-native';
import { Text, Button, Header } from '_atoms'
import { ListEmptyComponent} from '_molecules'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { Images ,Methods} from '_utils'
import { useDispatch, useSelector } from "react-redux";
import {
  removeFevoriteRequest
} from '../../../store/modules/addRemoveFevorite/actions'
import { Typography, Colors, Mixins, AppStyles } from '_styles';
import { FavrouiteItem } from '../templates';
import {
  getFevoriteTrainerRequest
} from '../../../store/modules/fevoriteTrainer/actions'
import {
  removeFevoriteTrainerRequest
} from '../../../store/modules/addRemoveFavoriteTrainer/actions'
import {
  getFevoriteRequest
} from '../../../store/modules/fevoriteGyms/actions'
let { boxShadow, padding } = Mixins


// Component 
const Favrouite = ({ navigation }) => {
  const dispatch = useDispatch()
  const { fevoriteGyms,fevoriteTrainer } = useSelector(({fevoriteGymsReducer,fevoriteTrainerReducer}) => ({
    fevoriteGyms: fevoriteGymsReducer.fevoriteGyms && fevoriteGymsReducer.fevoriteGyms.length > 0?
    fevoriteGymsReducer.fevoriteGyms[0].favouritegymId :[] ,
    fevoriteTrainer:fevoriteTrainerReducer.fevoriteTrainer && fevoriteTrainerReducer.fevoriteTrainer.length > 0?
    fevoriteTrainerReducer.fevoriteTrainer[0].favouritetrainerId :[]
    
  }));
  useEffect(() => {
    getFevoriteList()
    getFevoriteTrainerList()
  }, [])
  
/****************************** Api Function *************************************/
const getFevoriteList = () => {
      dispatch(getFevoriteRequest())
  }
  const getFevoriteTrainerList = () => {
    dispatch(getFevoriteTrainerRequest())
 }

  const onPressFevorite = (item) => {
    if(item && item.trainerLocation){
      let data = {
        trainerId:item._id
      }
      dispatch(removeFevoriteTrainerRequest(data))
    }else{
      let data = {
        gymId:item._id
      }
      dispatch(removeFevoriteRequest(data))
    }
  }
/****************************** Render Main  *************************************/
  return <View style={[{ flex: 1, backgroundColor: Colors.white }]}>
    <Header
      leftText
      image={Images.back}
      onPressLeft={()=> navigation.goBack()}
      style={[boxShadow('trasparent', {}, 0)]}
      title={'Favorite Gym'}
      textStyle={{ textAlign: 'center' }}
    />
      <View style={{ 
        flex:1,backgroundColor: Colors.white,paddingTop:scale(12)}}>
          <FlatList
            data={[...fevoriteGyms,...fevoriteTrainer]}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={()=> <ListEmptyComponent message={'No fevorite data found!'}/>}
            renderItem={({item,index}) => <FavrouiteItem 
              item={item}
              index={index}
              onPressFevorite={() => onPressFevorite(item)}
              onPress={() => navigation.navigate('Details',{
                from :item.trainerLocation ? 'trainers':'gyms',
                itemDetail:item

              })}            
              />}
            style={{backgroundColor: Colors.white}}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => 'store' + index}
          />
        </View>

  </View>
}

export default Favrouite;