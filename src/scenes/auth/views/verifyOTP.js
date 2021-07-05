import React, { useState, useRef, useEffect, } from 'react';
import { View, TouchableOpacity, Keyboard, Image, ScrollView, AppStylesheet } from 'react-native';
import { Text, Button, Header, TextInput, SmallIcon } from '_atoms'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { Images, Methods } from '_utils'
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import { AuthButton } from '../templates'
import { useDispatch, useSelector } from "react-redux";
import Config from '_utils/constants/apiConstant';

import { Typography, Colors, Mixins, AppStyles } from '_styles';
let { padding, boxShadow, margin } = Mixins
import { resetRequest,clearOTPRequest } from '../../../store/modules/verifyOTP/actions';

// Component 
const VerifyOtp = ({ navigation, route }) => {

/****************************** Get Store State & Hooks*************************************/
    let pinInputRef;
    pinInputRef = React.createRef();
    const [state, setState] = useState({ code: '' });
    const [paramsData,setParams] = useState({...route.params})
    const dispatch = useDispatch()
    const { resetData} = useSelector(state => ({
        resetData: state.resetotpReducer.resetData,
    }));

    useEffect(()=>{
        if(route.params?.forgot){
            onResendCode()
        }
    },[])
    
    
/****************************** API Function *************************************/
    const onResendCode = () => {
        let { mobileNumber, countryCode } = paramsData;
        dispatch(resetRequest(countryCode, mobileNumber))
        setParams({...paramsData,otp:null})

    }
    const goToNextScreen = () => {
       
        let { showToast } = Methods
        const { otp, mobileNumber, isNew, countryCode, forgot, countryName } = paramsData;
        const { code } = state
        console.log(resetData,"resetData",otp,paramsData)
        if(code == otp){
            if (forgot || isNew === 'no') {
                navigation.navigate('ForgotPassword', {
                    mobileNumber: mobileNumber,
                    otp: code,
                    forgot: true,
                });
            } else {
                navigation.navigate(Config.Register, {
                    mobileNumber: mobileNumber,
                    countryCode: countryCode,
                    countryName: countryName,
                    otp: otp,
                });
            }
            dispatch(clearOTPRequest())
        }else if(resetData && code == resetData.OTP ){
            if (forgot || isNew === 'no') {
                navigation.navigate('ForgotPassword', {
                    mobileNumber: mobileNumber,
                    otp: code,
                    forgot: true,
                });
            } else {
                navigation.navigate(Config.Register, {
                    mobileNumber: mobileNumber,
                    countryCode: countryCode,
                    countryName: countryName,
                    otp: otp,
                });
            }
            dispatch(clearOTPRequest())
        }else {
          //  pinInputRef.current.shake().then(() => );
            setState({ code: '' })
            showToast('Please enter valid OTP', 'danger');
        }
    };

    /****************************** Function Main  *************************************/
    const handleChange = (value, name) => {
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    /****************************** Render Main  *************************************/
    return <View style={[{ flex: 1, backgroundColor: Colors.white }]}>
        <Header
            leftText
            image={Images.back}
            onPressLeft={() => navigation.goBack()}
            style={[boxShadow('trasparent', {}, 0), padding(0,8,0,8),{
            }]}
            title={'Verify OTP'}
            textStyle={{ textAlign: 'center' }}
        />
        <ScrollView 
              showsVerticalScrollIndicator={false}

        contentContainerStyle={[padding(16, 16, 0, 16),]}
            keyboardShouldPersistTaps={'never'}
            style={{ backgroundColor: Colors.white }}>

            {/********************** OTP Heading  *************************/}

            <View style={AppStyles.gridViewBackground}>
                <View style={AppStyles.otpHeading}>
                    <Text style={AppStyles.otpText}>{'Enter the 4-digit code sent to you at'}</Text>
                    <Text h6 style={{
                        fontSize: Typography.normalize(14),
                        color: Colors.black,
                        lineHeight: 25
                    }}>
                        {`${paramsData.countryCode} ${paramsData.mobileNumber}`}
                    </Text>
                </View>
                {/********************** OTP Input  *************************/}

                <View style={AppStyles.otp}>
                    <SmoothPinCodeInput
                        ref={(ref) => pinInputRef = ref}
                        cellStyle={{
                            borderBottomWidth: 2,
                            borderColor: 'rgba(0,0,0,0.1)',
                        }}
                        cellStyleFocused={{
                            borderColor: Colors.primary1,
                        }}
                        textStyleFocused={{
                            color: Colors.textColor,
                            color: 'rgba(0,0,0,1)',

                        }}
                        textStyle={{
                            color: 'rgba(0,0,0,0.5)',
                            fontSize: Typography.normalize(24)

                        }}
                        keyboardType="numeric"
                        value={state.code}
                        placeholder={'0'}
                        onTextChange={code => handleChange(code, 'code')}
                    />
                </View>
            </View>


        </ScrollView>
        {/**************** Back To Login  *******************/}
        <BottomAbsoluteButton image={Images.next}
            onPress={() => goToNextScreen()}
        />
        <View style={{
            justifyContent: 'center',
            flex: 1,
        }}>
            <AuthButton
                title={'Resend Code'}
                transparent={true}
                buttonTextStyle={{
                    fontSize: Typography.normalize(18),
                    fontWeight: '500',
                    color: '#EE5F58'
                }}
                pressButton={() => onResendCode()}
            />
        </View>

    </View>
}

export default VerifyOtp;

