import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  FlatList,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  
} from 'react-native-responsive-screen';
import { useDispatch, shallowEqual, useSelector } from "react-redux";

import {Text, Button, Header, Label, Card, SmallIcon} from '_atoms';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {Images,Methods} from '_utils';
import {WebView} from 'react-native-webview';
import Config, {SUCCESS} from '_utils/constants/apiConstant';
import {Request} from '_services';

import {Typography, Colors, Mixins, AppStyles} from '_styles';
let {padding, boxShadow, margin, windowHeight} = Mixins;
import Entypo from 'react-native-vector-icons/Entypo';

// Component
const Supports = ({navigation}) => {
  const [isToggle, setToggle] = useState(false);
  const [helpSupport, setHelpSupport] = useState('');
  useEffect(() => {
    getHelpAndSupport();
  }, []);
  /****************************** API Function *************************************/

  const getHelpAndSupport = async () => {
    let apiName;
    apiName = `${Config.helpandsupport}`;
    debugger
    let { showToast } = Methods
    try{
      const response = await Request.getWebView(apiName);
      // debugger;
      if (response.status ==SUCCESS) {
        setHelpSupport(response.data);
      }else{
        showToast(response.message?response.message:'Failed','danger' )
      }
    }catch(error){
      showToast(error.message,'danger')

    }
    
  }
  {
    /************************** Main View  ******************************************************/ }

  return (
    <View style={[{flex: 1, backgroundColor: Colors.white}]}>
      <Header
        leftText
        image={Images.hamburgerBlack}
        onPressLeft={() => navigation.openDrawer()}
        style={[boxShadow('trasparent', {}, 0), padding(0,16)]}
        title={'Help & Support'}
        textStyle={{textAlign: 'center'}}
      />
      {/**************************************** FAQ View  ***********************************************************/}
      <View style={styles.gridViewBackground}>
        <View
          style={{
            width: '100%',
            flex: 1,
            overflow: 'hidden',
            marginBottom: 100,
            backgroundColor: 'white',
          }}>
          {helpSupport ? (
            <WebView
              originWhitelist={['*']}
              source={{html: `${helpSupport}`}}
              startInLoadingState={true}
              containerStyle={{paddingHorizontal: 24}}
              renderLoading={() => (
                <ActivityIndicator size={'large'} color={Colors.primary} />
              )}
              style={{width: '100%', height: '100%'}}
            />
          ) : null}
        </View>
        {/**************************************** Bottom View  ***********************************************************/}
        <View style={styles.arrowTile}>
          <View>
            <Label
              title={'Still stuck? Help is a message away'}
              labelStyle={{
                color: 'rgba(0,0,0,0.75)',
                fontSize: Typography.normalize(16),
              }}
            />
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('SupportMessage')}
            style={{
              width: '80%',
              height: 45,
              marginTop: moderateScale(45),
              alignItems: 'center',
              justifyContent: 'center',
              marginHorizontal: 10,
              borderRadius: 27,
              marginBottom: moderateScale(45),
              backgroundColor: Colors.primary2,
            }}>
            <Text style={styles.title}> {'Send a Message'} </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Supports;
const styles = StyleSheet.create({
  gridViewBackground: {
    flex: 1,
    marginTop: 20,
    marginBottom: 0,
    borderColor: 'white',
    borderWidth: 0.0,
    backgroundColor: 'white',
  },
  title: {
    color: 'white',
    fontSize: Typography.normalize(18),
  },
  arrowTile: {
    backgroundColor: 'white',
    width: '100%',
    position: 'absolute',
    left: 0,
    bottom: 80,
    justifyContent: 'center',
    alignItems: 'center',
    height: wp('16%'),
    marginBottom: -50,
    borderBottomWidth: 0,
    borderColor: '#818e97',
  },
});
