import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import {promoListRequest} from '../../../store/modules/promoCodes/actions';
import {ListEmptyComponent} from '_molecules';

import {Text, Button, Label, SmallIcon, Header, TextInput} from '_atoms';
import moment from 'moment';
import {Images, Validation, Methods} from '_utils';
import {Typography, Colors, Mixins, AppStyles} from '_styles';
let {boxShadow, padding, windowHeight} = Mixins;

const Coupon = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {promoCodesData} = useSelector(state => ({
    promoCodesData: state.promoCodesReducer.promoListData,
  }));
  const [couponsList, setCouponList] = useState(promoCodesData);
  useEffect(() => {
    getPromoListData()
  }, []);
  useEffect(() => {
    setCouponList(promoCodesData)
  }, [promoCodesData]);
  /****************************** Api Function *************************************/
  const getPromoListData = () => {
    dispatch(promoListRequest())
  };
  /****************************** Main Function *************************************/
  const getExpiryDate = dat => {
    var newDate = moment(Date(dat)).format('LL');
    var newDate1 = 'Valid Upto ' + newDate;
    return newDate1;
  };
  const onSelectPromo = item => {
    let {selectPromo} = route.params;
    selectPromo(item);
    navigation.goBack();
  };
  /****************************** Render Main *************************************/
  return (
    <View style={[{flex: 1, backgroundColor: Colors.white}]}>
      <Header
        leftText
        image={route.params ?
          Images.back:Images.hamburgerBlack}
        onPressLeft={() => route.params ?navigation.goBack() : navigation.openDrawer()}
        style={[
          boxShadow('trasparent', {height:0,width:0}, 0,0),
          {backgroundColor: Colors.white},
        ]}
        title={'Promotions'}
        textStyle={{textAlign: 'center'}}
      />
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          marginTop: 2,
        }}>
        <View style={{height: moderateScale(8)}} />
        <FlatList
          data={couponsList}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <View
              style={{
                flex: 1,
                paddingHorizontal: moderateScale(16),
                paddingVertical: moderateScale(8),
              }}>
              <ImageBackground
                resizeMode={'stretch'}
                source={Images.promocodebg}
                style={{
                  width: '100%',
                  minHeight: windowHeight / 7,
                  maxHeight: windowHeight / 5,
                }}>
                <View
                  style={[
                    padding(16,24),
                    {
                      flexDirection:'row',
                      marginTop: moderateScale(8),
                    },
                  ]}>
                  <View style={{flex:0.9}}>
                    <Label
                      title={`${item.detials}`}
                      labelStyle={{
                        color: Colors.black,
                        fontSize: Typography.normalize(13),
                      }}
                    />
                    
                    <View
                      style={[
                        {
                          marginTop: moderateScale(18),
                        },
                      ]}
                    />
                    <Text
                      style={{
                        color: Colors.black,
                        fontSize: Typography.normalize(13),
                      }}>
                        {getExpiryDate(item.upto)} Can be used {item.limit} times,
                    </Text>
                  </View>
                  
                  <View style={{
                    flex:0.4,
                    justifyContent:'flex-start',
                    alignItems: 'flex-end'}}>
                    <TouchableOpacity 
                    disabled={!route.params}
                    onPress={()=> onSelectPromo(item)}
                    >
                    <Text
                      style={{
                        color: Colors.black,
                        fontSize: Typography.normalize(14),
                      }}>
                      {` Apply`}
                    </Text>
                  </TouchableOpacity>
                  <View style={{
                    flex:1,justifyContent:'flex-end'}}>
                    <Text
                      style={{
                        color: Colors.black,
                        fontSize: Typography.normalize(12),
                      }}>
                      {` *T&C applied`}
                    </Text>
                    </View >
                  </View>
                </View>
              </ImageBackground>
            </View>
          )}
          ListEmptyComponent={() => (
            <ListEmptyComponent message={'No promo found!'} />
          )}
          keyExtractor={(item, index) => index + 'promo'}
        />
      </View>
    </View>
  );
};
export default Coupon;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  headerView: {
    height: 60,
    width: '100%',
    backgroundColor: '#1c1c1a',
    borderColor: '#0082cb',
    borderWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: 'white',
  },

  gridViewBackground: {
    flex: 1,
    marginTop: 0,
    marginBottom: -50,
    borderColor: 'black',
    borderWidth: 0.0,
    backgroundColor: 'white',
  },
  backTouchable: {
    position: 'absolute',
    width: 60,
    height: 60,
    top: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    // position: 'absolute',
    width: 22,
    height: 22,
    top: 0,
    left: 0,
    backgroundColor: 'transparent',
  },
  loadDetail: {
    backgroundColor: '#ffff',
    borderColor: 'gray',
    marginBottom: 6,
    // marginLeft: '2%',
    // width: '`100`%',
    marginTop: 5,
    borderRadius: 5,
    padding: 6,
    shadowRadius: 5,
    borderBottomWidth: 0.0,
  },
  sourceAddressBG: {
    marginTop: 20,
    marginHorizontal: 20,
    height: 30,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  destAddressBG: {
    marginTop: 0,
    marginHorizontal: 20,
    height: 30,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  sourceIcon: {
    width: 15,
    height: 15,
  },
  equipmentIcon: {
    width: 0,
    height: 0,
  },
  arrowTile: {
    backgroundColor: 'transparent',
    height: wp('16%'),
    position: 'absolute',
    right: wp('5.33%'),
    left: wp('5.33%'),
    bottom: wp('18%'),
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 0,
    borderColor: 'blue',
  },
  touchableArrow: {
    backgroundColor: '#2a4359',
    position: 'absolute',
    right: 0,
    height: wp('16%'),
    width: wp('16%'),
    bottom: 0,
    borderRadius: wp('8%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowIcon: {
    width: wp('6.66%'),
    height: wp('6.66%'),
  },
  txtNoLoads: {
    marginTop: 50,
    width: '100%',
    textAlign: 'center',

    fontSize: wp('5.86%'),
  },
  tabViewBG: {
    flexDirection: 'row',
    marginHorizontal: 0,
    backgroundColor: 'black',
    height: wp('10.66%'),
    width: '100%',
  },
  tab1BG: {
    backgroundColor: 'transparent',
    height: '100%',
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tab2BG: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    height: '100%',
    width: '50%',
  },
  txtUpcoming: {
    fontSize: wp('4.8%'),
    color: 'white',
    fontWeight: 'bold',
  },
  list: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cards: {
    padding: 30,
    backgroundColor: '#d9d9d9',
    shadowColor: '#000000',
    shadowOpacity: 2,
    shadowRadius: 2,
    margin: 12,
    shadowOffset: {
      height: 1,
      width: 1,
    },
  },
});
