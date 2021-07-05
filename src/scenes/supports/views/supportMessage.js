
import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Keyboard,
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useDispatch, shallowEqual, useSelector } from "react-redux";
import { Validation, Methods } from '_utils'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Text, TextInput, Button, Header, Label, Card, SmallIcon} from '_atoms';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {Images} from '_utils';
import {Typography, Colors, Mixins, AppStyles} from '_styles';
let {padding, boxShadow, margin, windowHeight} = Mixins;
import {supportRequest} from '../../../store/modules/support/actions';
import { TouchableOpacity } from 'react-native-gesture-handler';

// Component
const SupportSendMessage = ({navigation}) => {
  const dispatch = useDispatch()
  const [state, setState] = useState({});
  useEffect(() => {
  }, []);

let nameField,messageField;
// /****************************** Validation *************************************/
const ValidationRules = () => {
    let { name = '', message=''} = state;
    let code  = 'en';
    return [
      {
        field: name,
        name: 'Name',
        rules: 'required|no_space',
        lang: code
      },
      {
        field: message,
        name: 'Message',
        rules: 'required|no_space',
        lang: code
      },
    ];

  };

  /****************************** API Function *************************************/
  const onSubmitMessage = () => {
    let { name = '', message='' } = state;
    let validation = Validation.validate(ValidationRules());
    let { showToast } = Methods
    if (validation.length != 0) {
      showToast(validation[0].message, 'danger')
    }else{
     let data = {
        name: name,
        msg: message,
      };
     dispatch(supportRequest(data, navigation))
    }
  }
  // /****************************** Main function  **************************/

  const handleChange = (value, name) => {
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  {
    /************************** Main View  ******************************************************/ }

  return (
    <View style={[{flex: 1, backgroundColor: Colors.white}]}>
      <Header
        leftText
        image={Images.back}
        onPressLeft={() => navigation.goBack()}
        style={[boxShadow('trasparent', {}, 0), padding(0,16)]}
        title={'Help & Support'}
        textStyle={{textAlign: 'center'}}
      />
      {/**************************************** FAQ View  ***********************************************************/}
      <KeyboardAwareScrollView
        
        showsVerticalScrollIndicator={false}

        >
          <View style={{flex: 0.4}}>
            <View
              style={{
                width: '100%',
                height: wp('50%'),
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'transparent',
              }}>
              <Image
                resizeMode="contain"
                style={{width: wp('50%'), height: wp('50%')}}
                source={Images.helpandsupport}
              />
            </View>

            <View
              style={{
                width: '100%',
                height: 'auto',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: wp('1%'),
                backgroundColor: 'transparent',
              }}>
              <Text
                h6
                style={{
                  fontSize: wp('5%'),
                  color: 'black',
                }}>
                {'Need Some Help?'}
              </Text>

              <Text
                p
                style={{
                  fontSize: wp('5%'),
                  marginTop: wp('3%'),
                }}>
                {'Feel free to get in touch with us'}
              </Text>
            </View>
          </View>
          <View style={{height: verticalScale(48)}} />
          <View style={{flex: 0.6}}>
            <TextInput
              label={''}
              inputMenthod={input => {
                nameField = input;
              }}
              placeholder={'Enter name'}
              placeholderTextColor="rgba(62,62,62,0.2)"
              returnKeyType="next"
              keyboardType="default"
              autoCorrect={false}
              autoCapitalize="none"
              blurOnSubmit={false}
              value={state.name}
              textInputStyle={{
                height: windowHeight / 15,
              }}
              viewTextStyle={[
                AppStyles.viewRatingTextStyle,
                {
                  height: windowHeight / 15,
                },
              ]}
              underlineColorAndroid="transparent"
              onChangeText={text => handleChange(text,'name')}
              onSubmitEditing={event => {
                messageField.focus()
    
              }}
           />
            <View style={{height: verticalScale(24)}} />
            <TextInput
              inputMenthod={input => {
                messageField = input;
              }}
              label={''}
              placeholder={'Message'}
              placeholderTextColor="rgba(62,62,62,0.2)"
              returnKeyType="next"
              keyboardType="default"
              autoCorrect={false}
              autoCapitalize="none"
              blurOnSubmit={false}
              multiline
              value={state.message}
              textInputStyle={{
                height: windowHeight / 10,
                paddingTop: 16,
              }}
              viewTextStyle={AppStyles.viewRatingTextStyle}
              underlineColorAndroid="transparent"
              onChangeText={text => handleChange(text,'message')}
              onSubmitEditing={event => {
                Keyboard.dismiss()

              }}
           />
          </View>
          <View style={{height: verticalScale(16)}} />

        </KeyboardAwareScrollView>

        <TouchableOpacity
        style={styles.arrowTile}
        onPress={()=> onSubmitMessage()}>
            <Text style={styles.title}>Submit</Text>
        </TouchableOpacity>
    </View>
  );
};

export default SupportSendMessage;
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
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal:moderateScale(24),
    borderRadius: 27,
    marginBottom: moderateScale(24),
    backgroundColor: Colors.primary2,
  },
});
