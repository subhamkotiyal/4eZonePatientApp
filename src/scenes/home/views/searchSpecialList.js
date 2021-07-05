import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  TextInput,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
  ImageBackground,
  Image,
  Alert,
  TouchableHighlight,
  Keyboard,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {Text, Button, Header} from '_atoms';
import Entypo from 'react-native-vector-icons/Entypo';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {Images} from '_utils';
import {Typography, Colors, Mixins, AppStyles} from '_styles';
import {FlatList} from 'react-native-gesture-handler';
let {padding, boxShadow} = Mixins;
import {CardImage} from '../templates';
import Config, {SUCCESS} from '_utils/constants/apiConstant';
import {Request} from '_services';
const SearchSpecialListModal = ({navigation, route}) => {
  let timer;
  const [state, setState] = useState({
    specialList: [],
  });
  useEffect(() => {}, []);
  const [locations, setLocationState] = useState({
      ...route.params.locations
  });
  /****************************** Api function  *************************************/
  const onChangeSearchSpecialList =async (specialistName)=>{
    try {
        let data ={}
        data['specialistName'] =specialistName
        const searchData = await Request.post(Config.searchSpecialist,data)
        debugger
        if(searchData.status == SUCCESS){
            setState(prevState => ({
                ...prevState,
                specialList: searchData.data,
              }));
        }
      } catch (err) {
        showAlert(err.message, 300);
      }
  }

  /****************************** Function Main  *************************************/
  const onChangeSource = async searchText => {
    try {
      setState(prevState => ({
        ...prevState,
        searchText: searchText,
      }));
      if(searchText.length >1){
        onChangeSearchSpecialList(searchText?searchText:searchText)

      }
    } catch (err) {
      showAlert(err.message, 300);
    }
  };


  const showAlert = (message, duration) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      Alert.alert(message);
    }, duration);
  };

  /****************************** Render Main  *************************************/
  return (
    <View style={[{flex: 1, backgroundColor: Colors.white}]}>
      <Header
        leftText
        image={Images.back}
        onPressLeft={() => navigation.goBack()}
        style={[boxShadow('trasparent', {}, 0)]}
        title={'Search Specialist'}
        textStyle={{textAlign: 'center'}}
      />
      <View style={styles.tile}>
        <View style={{flex: 0.1}}>
          <Image
            resizeMode="contain"
            style={styles.tileIcon}
            source={Images.searchhome}
          />
        </View>

        <TextInput
          placeholder="Search specialist ..."
          placeholderTextColor="grey"
          onChangeText={searchText => onChangeSource(searchText)}
          multiline
          value={state.searchText}
          style={[
            styles.searchTextInput,
            {
              height: 'auto',
              paddingTop: Platform.OS == 'ios' ? moderateScale(12) : 0,
              minHeight: moderateScale(48),
            },
          ]}></TextInput>
        {state.searchText ? (
          <TouchableOpacity
            onPress={() => {
              onChangeSource('');
              setState({
                ...state,
                searchText: '',
              });
            }}
            style={{flex: 0.1, justifyContent: 'flex-end'}}>
            <Entypo
              resizeMode="contain"
              size={28}
              color={'black'}
              name={'cross'}
            />
          </TouchableOpacity>
        ) : null}
      </View>
      <View style={{paddingTop:32}} >
      <FlatList
        numColumns={2}
        style={{backgroundColor: 'rgba(246, 250, 253, 0.4)'}}
        data={state.specialList}
        renderItem={({item,index}) => <CardImage
        onPress={()=> navigation.navigate('Doctors', {
          specialistId: item._id,
          locations: locations,
          specialistName: item.specialistName,
        })}
        item={item} index={index}/>}
        />
        </View>
    </View>
  );
};

export default SearchSpecialListModal;

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
});
