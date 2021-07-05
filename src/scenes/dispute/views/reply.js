import React, { useState, useRef, useEffect, } from 'react';
import { View, TouchableOpacity, Image, ScrollView, Keyboard } from 'react-native';
import { Text, Button, Label, TextInput, Card, Header } from '_atoms'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { Line } from '_molecules'
import { useDispatch, useSelector } from "react-redux";
import {
    updateDisputeRequest
} from '../../../store/modules/dispute/actions'
import { Images } from '_utils'
import { DisputeItem, IssueItem } from '../templates';
import { Validation, Methods } from '_utils'
import Config, { SUCCESS } from '_utils/constants/apiConstant';

import { Typography, Colors, Mixins, AppStyles } from '_styles';
let { padding, boxShadow, margin,windowHeight } = Mixins

// Component 
const Reply = ({ navigation ,route}) => {
    const { itemDetail } = route.params
    const [state, setState] = useState({});
    const dispatch = useDispatch()

    /****************************** Get Store State & Hooks*************************************/
    const [cliamDetails, setClaims] = useState([]);
    useEffect(()=>{
        if(itemDetail){
            let arrayClaims= [{ 
            title: 'Amount', value: `$ ${itemDetail.bookingId.totalAccount}` },
            { title: 'Artist Name', value: `${itemDetail.gymId ? itemDetail.gymId.name : ''}${itemDetail.trainerId ? itemDetail.trainerId.name : ''}` },
        ]
        setClaims(arrayClaims)
        }
    },[])

    /****************************** Validation *************************************/
     const ValidationRules = () => {
        let {  description = '' } = state;
        return [
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
        let validation = Validation.validate(ValidationRules());
        let { showToast } = Methods
        if (validation.length != 0) {
            showToast(validation[0].message, 'danger')
        } else {
            let data = {}    
            data['disputeId'] = itemDetail._id
            data['disputeReply'] = state.description
            dispatch(updateDisputeRequest(Config.updateDispute,data, navigation))
        }

    }
    const handleChange = (value, name) => {
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    /****************************** Render Child Component  **************************/
    const RenderButton = ({ title, backgroundColor, color }) => {
        return <View style={{
            justifyContent: 'center',
            flex: 1,
            paddingHorizontal:moderateScale(16)
        }}>
            <Button onPress={() => pressButton()}
                buttonStyle={{
                    borderRadius: moderateScale(42 / 2),
                    height: moderateScale(42),
                    backgroundColor: backgroundColor ? backgroundColor : Colors.primary
                }}
                buttonTextStyle={[{ fontWeight: 'bold', color: color ? color : Colors.white }]}
                title={title} />
        </View>
    }
    /****************************** Render Main  *************************************/
    return <View style={[{ flex: 1, backgroundColor: Colors.white }]}>
        <Header
            leftText
            image={Images.back}
            onPressLeft={() => navigation.goBack()}
            style={[boxShadow('trasparent', {}, 0), {
                backgroundColor: Colors.white ,    
          }]}
            title={'Reply'}
            textStyle={{ textAlign: 'center' }}
        />
        <ScrollView contentContainerStyle={[padding(0, 0, 8, 0),]}
            keyboardShouldPersistTaps={'never'}
            style={{ backgroundColor: Colors.white }}>

            {/************************* List Earnings  ***************************/}
            <Card cardStyle={[padding(0, 0),
            margin(8, 0, 8, 0),
            boxShadow('black', { height: 1, width: 0 }, 0.1, 0.1),
            { borderRadius: moderateScale(0), 
            backgroundColor: 'transparent' }]}>
                {
                    cliamDetails.map((claim, i) => {
                        return <View key={'claim' + i}>
                            <View style={AppStyles.claimContainer}>
                                <View style={{ flex: 0.5, justifyContent: 'center' }}>
                                    <Text h6 style={AppStyles.text13}>{claim.title}:</Text>
                                </View>
                                <View style={AppStyles.claimRightView}>
                                    <Text p style={AppStyles.textSmall}>{claim.value}</Text>
                                </View>
                            </View>
                            <Line
                                lineColor={'rgba(0, 0, 0, 0.05)'}
                            />
                        </View>
                    })
                }
            </Card>
            <View style={{ flex: 0.5, marginTop: moderateScale(32),
                paddingHorizontal:moderateScale(16)}}>

                {/*************** Achhount Holder Name *******************/}
                <TextInput
                    label={''}
                    placeholder={'Message'}
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
                    mainContainer={{justifyContent:'flex-start'}}
                    viewTextStyle={[AppStyles.viewReplyTextStyle,{
                    }]}
                    underlineColorAndroid="transparent"
                    onChangeText={(text) => handleChange(text,'description')}
                  
                />
            </View>
            <View style={{ height: verticalScale(48) }} />

            <RenderButton title={'Update Dispute'} />
        </ScrollView>

    </View>
}

export default Reply;