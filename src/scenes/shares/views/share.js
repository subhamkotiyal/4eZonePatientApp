import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Keyboard,
  Image,
  Alert,
  ScrollView,
  Linking,
  AppStylesheet,
} from 'react-native';
import {Text, Button, Header, TextInput, SmallIcon} from '_atoms';
import {Images} from '_utils';
import {Line} from '_molecules';
import {Typography, Colors, Mixins, AppStyles} from '_styles';
let {padding, boxShadow, margin} = Mixins;
import Share from 'react-native-share';

// Component
const ShareBeeTrainer = ({navigation}) => {
  {/******************* Instagram Share *************************/}
  const instagramShare = () => {
    const shareOptions = {
      title: 'Share via',
      message: 'some message',
      content: 'content',
      url: 'https://awesome.contents.com/',
      social: Share.Social.INSTAGRAM,
    };
    Share.shareSingle(shareOptions);
  };
  {/********************* Twitter Share ***************/}
  const tweetShare = () => {
    const shareOptions = {
      title: 'Share via',
      message: 'some message',
      content: 'content',
      url: 'https://awesome.contents.com/',
      social: Share.Social.TWITTER,
    };
    Share.shareSingle(shareOptions);
  };
    {/********************* Facebook Share ***************/}

  const facebookShare = () => {
    const shareOptions = {
      title: 'Share via',
      message: 'some message',
      content: 'content',
      url: 'https://awesome.contents.com/',
      social: Share.Social.FACEBOOK,
    };
    Share.shareSingle(shareOptions);
  };
  /****************************** Render Main  *************************************/
  return (
    <View style={[{flex: 1, backgroundColor: Colors.white}]}>
      <Header
        leftText
        image={Images.hamburgerBlack}
        onPressLeft={() => navigation.openDrawer()}
        style={[boxShadow('trasparent', {}, 0), padding(0,16)]}
        title={'Follow Us On'}
        textStyle={{textAlign: 'center'}}
      />
      <ScrollView
            showsVerticalScrollIndicator={false}

        contentContainerStyle={[padding(16, 0, 0, 0)]}
        style={{backgroundColor: Colors.white}}>
        {/********************* Instagram Icon  **********************************/}
        <TouchableOpacity
          onPress={() => instagramShare()}
          style={[AppStyles.row, AppStyles.followContainer]}>
          <View style={AppStyles.followLeftRow}>
            <SmallIcon source={Images.instagram} style={AppStyles.followIcon} />
          </View>
          <View style={AppStyles.followRightRow}>
            <Text h6 style={AppStyles.followText}>
              Instagram
            </Text>
          </View>
        </TouchableOpacity>
        <Line lineColor={'rgba(0, 0, 0, 0.05)'} />
        {/********************* Twitter Icon  **********************************/}
        <TouchableOpacity
          onPress={() => tweetShare()}
          style={[AppStyles.row, AppStyles.followContainer]}>
          <View style={AppStyles.followLeftRow}>
            <SmallIcon source={Images.twitter} style={AppStyles.followIcon} />
          </View>
          <View style={AppStyles.followRightRow}>
            <Text h6 style={AppStyles.followText}>
              Twitter
            </Text>
          </View>
        </TouchableOpacity>
        <Line lineColor={'rgba(0, 0, 0, 0.05)'} />
        {/********************* Facebook Icon  **********************************/}
        <TouchableOpacity
          onPress={() => facebookShare()}
          style={[AppStyles.row, AppStyles.followContainer]}>
          <View style={AppStyles.followLeftRow}>
            <SmallIcon source={Images.facebook} style={AppStyles.followIcon} />
          </View>
          <View style={AppStyles.followRightRow}>
            <Text h6 style={AppStyles.followText}>
              Facebook
            </Text>
          </View>
        </TouchableOpacity>
        <Line lineColor={'rgba(0, 0, 0, 0.05)'} />
      </ScrollView>
    </View>
  );
};

export default ShareBeeTrainer;
