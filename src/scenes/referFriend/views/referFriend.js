import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Share,
  ScrollView,
  AppStylesheet,
} from 'react-native';
import {Text, Button, Header, Card, SmallIcon} from '_atoms';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {Images} from '_utils';
import {InvitationLink} from '../templates';

import {Typography, Colors, Mixins, AppStyles} from '_styles';
let {padding, boxShadow, margin} = Mixins;

// Component
const textMessage = `I love the BeeTrainer. Use this link to Sign Up:`;

const ReferFriend = ({navigation}) => {
  const [shareMessage, setShareMessage] = useState(
    `${textMessage} https://play.google.com/store/apps/details?id=com.beetrainercustomer`,
  );
  /****************************** Main function  **************************/
  const inviteSend = async () => {
    try {
      const result = await Share.share({
        message: shareMessage,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  /****************************** Render function *************************/

  return (
    <View style={[{flex: 1, backgroundColor: Colors.white}]}>
      <Header
        leftText
        image={Images.hamburger}
        onPressLeft={() => navigation.openDrawer()}
        style={[boxShadow('trasparent', {}, 0), padding(16)]}
        title={'Invite Friend'}
        textStyle={{textAlign: 'center'}}
      />

      <ScrollView
        contentContainerStyle={[padding(16, 16, 0, 16)]}
        keyboardShouldPersistTaps={'never'}
        style={{backgroundColor: Colors.white}}>
        <View
          style={[
            {
              marginTop: moderateScale(32),
              flex: 1,
            },
          ]}>
          {/**************** Image View  *******************/}
          <View style={AppStyles.imageViewStyle}>
            <Image
              source={Images.invite}
              style={AppStyles.imageStyle}
              resizeMode={'contain'}
            />
          </View>
          <View style={{height: verticalScale(24)}} />

          {/**************** Heading View  *******************/}
          <View style={AppStyles.headingView}>
            <Text
              p
              style={[
                AppStyles.contactText,
                {
                  color: 'rgba(0,0,0,0.4)',
                },
              ]}>
              Invite your Friends
            </Text>
          </View>
        </View>
        <View style={{height: verticalScale(16)}} />

        {/****************   Invitation  Link  *******************/}
        <View
          style={[
            AppStyles.subView,
            {
              flex: 0.2,
              marginTop: moderateScale(32),
              marginBottom: moderateScale(8),
            },
          ]}>
          <Text
            p
            style={[
              AppStyles.contactText,
              {
                color: 'rgba(0,0,0,0.2)',
              },
            ]}>
            Tap on invitation link to copy
          </Text>
        </View>
        <InvitationLink />
        <View style={{height: verticalScale(16)}} />

        {/**************** Invitation  Friend Button  *******************/}
        <View
          style={{
            justifyContent: 'center',
            marginVertical: moderateScale(48),
            paddingHorizontal: moderateScale(8),
            flex: 1,
          }}>
          <Button onPress={() => inviteSend()} title={'Invite a Friend'} />
        </View>
      </ScrollView>
    </View>
  );
};

export default ReferFriend;
