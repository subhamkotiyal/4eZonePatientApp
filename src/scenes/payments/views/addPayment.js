import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Keyboard,
  Image,
  ActivityIndicator,
  ScrollView,
  AppStylesheet,
} from 'react-native';
import {Text, Button, Header, TextInput, SmallIcon} from '_atoms';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {Images, Methods} from '_utils';
import stripe from 'tipsi-stripe';
import {useDispatch, useSelector} from 'react-redux';

import {posRequest} from '../../../store/modules/addPOS/actions';
import {Typography, Colors, Mixins, AppStyles} from '_styles';
let {padding, boxShadow, margin} = Mixins;

// Component
stripe.setOptions({
  publishableKey: 'pk_test_LLAdXVApiHYl2QUmtHy2HiHT', //'pk_test_INM9aFcqplBpLxivFa68HdMt00LjD5iZ7U'     // test
  androidPayMode: 'test', // Android only
});

const AddPayment = ({navigation}) => {
  /****************************** Get Store State & Hooks*************************************/
  let accountHolderName, accountNumerField, exptField, cvvFiled;
  const [state, setState] = useState({cardName: '', cardNumber: ''});
  const dispatch = useDispatch();
  const {language, loginData} = useSelector(state => ({
    language: state.switchLanguage.language,
    loginData: state.loginReducer.loginData,
  }));
  const [loading,setLoading] = useState(false)
  /****************************** Function Main  *************************************/
  const stripePay = () => {
    debugger;
    const {expDate, cardNumber, cvv, CardName} = state;
    let {showToast} = Methods;
    var str = expDate;
    var month = str.substring(0, 2);
    var year = str.substring(3, 5);
    const params = {
      number: cardNumber,
      expMonth: parseInt(month, 10),
      expYear: parseInt(year, 10),
      cvc: cvv,
      name: CardName,
    };
    stripe
      .createTokenWithCard(params)
      .then(token => {
        setLoading(false)

        const customerid = loginData._id;
        dispatch(
          posRequest(
            customerid,
            token.card.brand,
            token.tokenId,
            token.card.last4,
            navigation,
          ),
        );
      })
      .catch(e => {
        setLoading(false)
        showToast(e.message, 'danger');
      });
  };
  /****************************** Function Main  *************************************/
  const goToNextScreen = () => {
    const {cardNumber, expDate, cvv, cardName} = state;
    let {showToast} = Methods;
    if (
      cardNumber.trim().length > 14 &&
      expDate.trim().length > 4 &&
      cvv.trim().length > 2 &&
      cardName.trim().length > 0
    ) {
      setLoading(true)
      stripePay();
    } else {
      setLoading(false)
      showToast('Please enter valid details of card.', 'danger');
    }
  };
  const handleChange = (value, name) => {
    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  /****************************** Render Main  *************************************/

  return (
    <View style={[{flex: 1, backgroundColor: Colors.white}]}>
      <Header
        leftText
        image={Images.back}
        onPressLeft={() => navigation.goBack()}
        style={[boxShadow('trasparent', {}, 0), padding(0,16)]}
        title={'Add Card'}
        textStyle={{textAlign: 'center'}}
      />
      <ScrollView
            showsVerticalScrollIndicator={false}

        contentContainerStyle={[padding(16, 16, 0, 16)]}
        keyboardShouldPersistTaps={'never'}
        style={{backgroundColor: Colors.white}}>
        {/********************** Image View  *************************/}
        <View style={[{marginTop: moderateScale(24), flex: 1}]}>
          <View style={AppStyles.imageViewStyle}>
            <Image
              source={Images.addcard}
              style={AppStyles.imageStyle}
              resizeMode={'contain'}
            />
          </View>
        </View>
        {/**************************** TextInput *************************/}
        <View style={{height: verticalScale(16)}} />

        <View style={{flex: 0.5, marginTop: moderateScale(16)}}>
          {/*************** Achhount Holder Name *******************/}
          <TextInput
            label={''}
            inputMenthod={input => {
              accountHolderName = input;
            }}
            placeholder={'Card Name'}
            placeholderTextColor="rgba(62,62,62,0.55)"
            returnKeyType="next"
            keyboardType="default"
            leftIcon={Images.nameIcon}
            autoCorrect={false}
            autoCapitalize="none"
            blurOnSubmit={false}
            viewTextStyle={[
              AppStyles.viewAddressTextStyle,
              {
                height: moderateScale(48),
              },
            ]}
            underlineColorAndroid="transparent"
            onFocus={() => handleChange(true, 'nameFieldFocus')}
            onBlur={() => handleChange(false, 'nameFieldFocus')}
            onChangeText={text => handleChange(text, 'cardName')}
            onSubmitEditing={event => {
              accountNumerField.focus();
            }}
          />
          <View style={{height: verticalScale(16)}} />
          {/*************** Achhount Holder Name *******************/}
          <TextInput
            label={''}
            inputMenthod={input => {
              accountNumerField = input;
            }}
            placeholder={'Card Number'}
            placeholderTextColor="rgba(62,62,62,0.55)"
            returnKeyType="next"
            keyboardType="default"
            leftIcon={Images.card}
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType={'numeric'}
            maxLength={16}
            blurOnSubmit={false}
            viewTextStyle={[
              AppStyles.viewAddressTextStyle,
              {
                height: moderateScale(48),
              },
            ]}
            underlineColorAndroid="transparent"
            onFocus={() => handleChange(true, 'nameFieldFocus')}
            onBlur={() => handleChange(false, 'nameFieldFocus')}
            onChangeText={text => handleChange(text, 'cardNumber')}
            onSubmitEditing={event => {
              exptField.focus();
            }}
          />
          {/*************** Exp date *******************/}
          <View style={{height: verticalScale(16)}} />
          <View style={[AppStyles.rowSpaceBetween]}>
            <View style={{flex: 0.49}}>
              <TextInput
                label={''}
                inputMenthod={input => {
                  exptField = input;
                }}
                placeholder={'Exp. Date'}
                placeholderTextColor="rgba(62,62,62,0.55)"
                returnKeyType="next"
                keyboardType="default"
                autoCorrect={false}
                autoCapitalize="none"
                blurOnSubmit={false}
                value={state.expDate}
                keyboardType={'numeric'}
                maxLength={7}
                viewTextStyle={[
                  AppStyles.viewAddressTextStyle,
                  {
                    height: moderateScale(48),
                  },
                ]}
                underlineColorAndroid="transparent"
                onFocus={() => handleChange(true, 'nameFieldFocus')}
                onBlur={() => handleChange(false, 'nameFieldFocus')}
                onChangeText={expDate => {
                  if (expDate.length == 2) {
                    expDate = expDate + '/';
                  } else if (expDate.length == 3) {
                    if (expDate.indexOf('/') !== -1) {
                      expDate = expDate.replace('/', '');
                    } else {
                      expDate = expDate.substr(0, 2) + '/' + expDate.substr(2);
                    }
                  }
                  handleChange(expDate, 'expDate');
                }}
                onSubmitEditing={event => {
                  cvvFiled.focus();
                }}
              />
            </View>

            <View style={{flex: 0.05}} />
            {/*************** CVV Textfiled *******************/}
            <View style={{flex: 0.49}}>
              <TextInput
                label={''}
                inputMenthod={input => {
                  cvvFiled = input;
                }}
                placeholder={'CVV'}
                placeholderTextColor="rgba(62,62,62,0.55)"
                returnKeyType="next"
                keyboardType="default"
                autoCorrect={false}
                autoCapitalize="none"
                blurOnSubmit={false}
                viewTextStyle={[
                  AppStyles.viewAddressTextStyle,
                  {
                    height: moderateScale(48),
                  },
                ]}
                keyboardType={'numeric'}
                maxLength={3}
                underlineColorAndroid="transparent"
                onFocus={() => handleChange(true, 'nameFieldFocus')}
                onBlur={() => handleChange(false, 'nameFieldFocus')}
                onChangeText={text => handleChange(text, 'cvv')}
                onSubmitEditing={event => {
                  Keyboard.dismiss();
                }}
              />
            </View>
          </View>
          
        </View>
        <View style={{ height: verticalScale(65) }} />

        <BottomAbsoluteButton
        image={Images.tick}
        customeStyle={{bottom:0}}

        onPress={() => goToNextScreen()}
      />
       <View style={{ height: verticalScale(65) }} />
      </ScrollView>
      {loading && <View style={{
      backgroundColor:'rgba(0,0,0,0.1)',
      height:'100%',
      width:'100%',
        position:'absolute',justifyContent:'center'}}>
        <ActivityIndicator 
        size={'large'} color={Colors.primary} />
      </View>}
    </View>
  );
};

export default AddPayment;
