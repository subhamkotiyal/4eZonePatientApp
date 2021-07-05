import React, { useState, useRef, useEffect, } from 'react';
import { View, TouchableOpacity, Image, ScrollView, Keyboard } from 'react-native';
import { Text, Button, Label, TextInput, Card, Header } from '_atoms'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { Line } from '_molecules'
import { ListModal } from '_molecules'
import { useDispatch, useSelector } from "react-redux";
import {
    sendDisputeRequest
} from '../../../store/modules/dispute/actions'

import { Images } from '_utils'
import { DisputeItem, IssueItem } from '../templates';
import { Validation, Methods } from '_utils'
import Config, { SUCCESS } from '_utils/constants/apiConstant';

  import { Typography, Colors, Mixins, AppStyles } from '_styles';
let { padding, boxShadow, margin, windowHeight } = Mixins

// Component 
const SendDispute = ({ navigation ,route}) => {
    /****************************** Get Store State & Hooks*************************************/
    const dispatch = useDispatch()
    const { itemDetail } = route.params
    const [cliamDetails, setClaims] = useState([{ name: 'Not good services', id: 1, isSelected: false, },
    { name: 'Trainer not good', id: 2, }, { name: 'High fees', id: 3, }])
    const [state, setState] = useState({ reason: null });
    const [isListModal, setIsListModal] = useState(false)
    /****************************** Validation *************************************/
    const ValidationRules = () => {
        let { reason = '', description = '' } = state;
        return [
            {
                field: reason,
                name: 'Reason',
                rules: 'required',
                lang: 'en',
            },
            {
                field: description,
                name: 'description',
                rules: 'required|no_space',
                lang: 'en',
            },

        ];

    };
    /****************************** API Function *************************************/

    const pressButton = () => {
        let { reason = '', description = '' } = state;
        let validation = Validation.validate(ValidationRules());
        let { showToast } = Methods
        if (validation.length != 0) {
            showToast(validation[0].message, 'danger')
        } else {
            let data = {}
            data['reason'] = reason.name
            let apiName 
            if(itemDetail.trainerId){
                apiName = Config.addTrainerDispute
                data['trainerId'] = itemDetail.trainerId._id
            }else{
                apiName = Config.addGymDispute
                data['gymId'] = itemDetail.gymId._id
            }
            data['bookingId'] = itemDetail._id
            data['description'] = state.description
            dispatch(sendDisputeRequest(apiName,data, navigation))
        }
    }

    /****************************** Main Function *************************************/

    const handleChange = (value, name) => {
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    //On select reason
    const onPressSelect = (item) => {
        setState(prevState => ({
            ...prevState,
            reason: item.name
        }));
        let newCliamDetails = cliamDetails.map((x => {
            if (x.id == item.id) {
                return { ...x, isSelected: true }
            } else { return { ...x, isSelected: false } }
        }))
        handleChange(item, 'reason')
        setClaims(newCliamDetails)
        setIsListModal(false)
    }
    /****************************** Render Child Component  **************************/
    const RenderButton = ({ title, backgroundColor, color }) => {
        return <View style={{
            justifyContent: 'center',
            flex: 1,
            paddingHorizontal: moderateScale(24)
        }}>
            <Button onPress={() => pressButton()}
                buttonStyle={{
                    borderRadius: moderateScale(42 / 2),
                    height: moderateScale(48),
                    backgroundColor: backgroundColor ? backgroundColor : Colors.primary
                }}
                buttonTextStyle={[{ fontWeight: 'bold', color: color ? color : Colors.white }]}
                title={title} />
        </View>
    }
    /****************************** Render Main  *************************************/
    return <View style={[{ flex: 1, backgroundColor: '#FCFCFC' }]}>
        <Header
            leftText
            image={Images.back}
            onPressLeft={() => navigation.goBack()}
            style={[boxShadow('trasparent', {}, 0),
            padding(0), { backgroundColor: '#FCFCFC' }]}
            title={'Dispute'}
            textStyle={{ textAlign: 'center' }}
        />
        <ScrollView 
              showsVerticalScrollIndicator={false}

        contentContainerStyle={[padding(16, 0, 8, 0),]}
            keyboardShouldPersistTaps={'never'}
            style={{ backgroundColor: '#FCFCFC' }}>

            <Label title={'Disclaimer'}
                labelStyle={{ color: Colors.black, fontSize: Typography.normalize(20) }}
                subLabelStyle={{
                    fontSize: Typography.normalize(14),
                    color: 'rgba(0,0,0,0.3)'
                }}
                subTitle={`Please use this page to serious incident or accident and for Job related queries.`}
                cardStyle={{ paddingHorizontal: moderateScale(24) }}
            />

            <View style={{
                flex: 0.5, marginTop: moderateScale(32),
                paddingHorizontal: moderateScale(24)
            }}>
                {/*************** Achhount Holder Name *******************/}
                <TextInput
                    placeholder={'Reason For Dispute'}
                    placeholderTextColor="rgba(62,62,62,0.2)"
                    returnKeyType="next"
                    keyboardType="default"
                    rightIcon={Images.downArrow}
                    autoCorrect={false}
                    autoCapitalize="none"
                    value={state.reason ? state.reason.name : ''}
                    blurOnSubmit={false}
                    editable={false}
                    onPress={() => setIsListModal(true)}
                    onTouchStart={() => setIsListModal(true)}
                    viewTextStyle={[AppStyles.viewAddressTextStyle, { backgroundColor: '#FCFCFC' }]}
                    underlineColorAndroid="transparent"

                />
                {/*************** Exp date *******************/}
                <View style={{ height: verticalScale(24) }} />
                <TextInput
                    label={''}
                    placeholder={'Description*'}
                    placeholderTextColor="rgba(62,62,62,0.2)"
                    returnKeyType="next"
                    keyboardType="default"
                    autoCorrect={false}
                    autoCapitalize="none"
                    blurOnSubmit={false}
                    multiline
                    value={state.description}
                    textInputStyle={{
                        height:'auto',
                    }}
                    viewTextStyle={[AppStyles.viewDisputeTextStyle,{

                    }]}
                    underlineColorAndroid="transparent"
                    onChangeText={(text) => handleChange(text, 'description')}
                    onSubmitEditing={event => {
                        Keyboard.dismiss()
                    }}
                />
            </View>
            <View style={{ height: verticalScale(48) }} />
        </ScrollView>
        <RenderButton title={'Send Message'} />
        {
            isListModal && <ListModal
                isModalVisible={isListModal}
                array={cliamDetails}
                labelRightIcon={'ios-close'}
                onPressSelect={(item) => onPressSelect(item)}
                onPressRight={() => setIsListModal(false)}
                closeModal={() => setIsListModal(false)}
            ></ListModal>
        }
    </View>
}

export default SendDispute;