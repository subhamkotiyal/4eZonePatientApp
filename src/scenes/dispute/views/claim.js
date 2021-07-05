import React, { useState, useRef, useEffect, } from 'react';
import { View, TouchableOpacity, Image, ScrollView, Keyboard } from 'react-native';
import { Text, Button, Label, SmallIcon, Card, Header } from '_atoms'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { Line } from '_molecules'
import { Request } from '_services'
import Config, { SUCCESS } from '_utils/constants/apiConstant';

import { Images } from '_utils'
import { DisputeItem, IssueItem } from '../templates';
import moment from 'moment'

import { Typography, Colors, Mixins, AppStyles } from '_styles';
let { padding, boxShadow, margin } = Mixins
import {
    showLoader,
    showToast,
    hideLoader,
} from '_utils/methods';
// Component 
const Claim = ({ navigation, route }) => {
    const { itemDetail } = route.params
    /****************************** Get Store State & Hooks*************************************/
    const [cliamDetails, setClaims] = useState([]);
    const [item, setDetails] = useState(itemDetail);
    useEffect(() => {
        getDisputeDetail()
    },[])
    /****************************** API Function *************************************/
    const pressButton = () => {
        navigation.navigate('Reply',{
            itemDetail:item
        })
    }
    const getDisputeDetail = async () => {
        try {
            const responseComp = await Request.get(`${Config.getDisputeById}/${itemDetail._id}`);
            if (responseComp.status === SUCCESS) {
                if (responseComp.data.length > 0) {
                    let claimsArray = responseComp.data.map((x, i) => {
                        return [{ title: 'Amount', value: `$ ${x.bookingId.totalAccount}` },
                        { title: 'Customer Name', value: `${x.customerId.name}` },
                        { title: 'Artist Name', value: `${x.gymId ? x.gymId.name : ''}${x.trainerId ? x.trainerId.name : ''}` },
                        { title: 'Disputed Date/Time', value: `${moment(x.createdAt).format('YYYY-MM-DD')} | ${moment(x.createdAt).format('hh:mm A')}` }]
                    })
                    debugger

                    setDetails(responseComp.data[0])
                    setClaims(claimsArray[0])
                }
            } else {
            }
        } catch (error) {
            showToast(error.message, 'danger')
        }
    }
    /****************************** Render Child Component  **************************/

    const RenderButton = ({ title, backgroundColor, color }) => {
        return <View style={{
            justifyContent: 'center',
            flex: 1
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
            style={[boxShadow('trasparent', {}, 0)]}
            title={'Claim'}
            textStyle={{ textAlign: 'center' }}
        />
        <ScrollView contentContainerStyle={[padding(0, 0, 8, 0),]}
            keyboardShouldPersistTaps={'never'}
            style={{ backgroundColor: Colors.white }}>

            {/************************* List Earnings  ***************************/}
            <Card cardStyle={[padding(0, 0),
            margin(0, 0, 8, 0),
            boxShadow('black', { height: 1, width: 0 }, 0.1, 0.1),
            { borderRadius: moderateScale(0), backgroundColor: 'transparent' }]}>
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
            <View style={{ paddingHorizontal: moderateScale(16) }}>
                {/************************* Reason ***************************/}
                <View style={{ height: verticalScale(24) }} />
                <Label
                    labelStyle={{ color: Colors.textColor, fontSize: Typography.normalize(14) }}
                    title={'Reason For Dispute:'} />
                <View style={{ paddingVertical: moderateScale(8) }}>
                    <Text h6 style={{ color: Colors.black }}>{itemDetail.reason}</Text>
                </View>

                {/************************* Issue ***************************/}
                <View style={{ height: verticalScale(16) }} />
                <Label title={'Issue Description:'}
                    labelStyle={{ color: Colors.textColor, fontSize: Typography.normalize(14) }}
                />
                <IssueItem item={item?{...item.customerId,
                description:(item.disputeReplyCustomer || item.disputeReplyGym || item.disputeReplyTrainer)
                 ? (item.disputeReplyCustomer || item.disputeReplyGym || item.disputeReplyTrainer) : item.description,
                createdAt:item.createdAt

                }:null} />
                <View style={{ height: verticalScale(32) }} />
                <RenderButton title={'Add A Reply'} />
            </View>
        </ScrollView>

    </View>
}

export default Claim;