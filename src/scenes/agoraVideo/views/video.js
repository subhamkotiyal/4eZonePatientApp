/* eslint-disable prettier/prettier */
import requestCameraAndAudioPermission from '../templates/permission';
import React, {Component} from 'react';
import {
  View,
  NativeModules,
  Dimensions,
  TouchableOpacity,
  Platform,
  
  ScrollView
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RtcEngine, AgoraView} from 'react-native-agora';
import styles from '../templates/styles';
import {Header,Button, Text, TextInput} from '_atoms';
import {Images, Validation, Methods} from '_utils';
import {Typography, Colors, Mixins, AppStyles} from '_styles';
import {Configuration} from '_utils';

let {boxShadow, padding, windowWidth, windowHeight} = Mixins;

const {Agora} = NativeModules; //Define Agora object as a native module

const {FPS30, AudioProfileDefault, AudioScenarioDefault, Adaptative} = Agora; //Set defaults for Stream
let dimensions = {
  //get dimensions of the device to use in view styles
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};
const config = {
  //Setting config of the app
  appid: 'e76630b77d5d42408dc0e575f0aefbd5', //Enter the App ID generated from the Agora Website
  channelName: '1111122222',
  channelProfile: 0, //Set channel profile as 0 for RTC
  videoEncoderConfig: {
    //Set Video feed encoder settings
    width: 720,
    height: 1080,
    bitrate: 1,
    frameRate: FPS30,
    orientationMode: Adaptative,
  },
  audioProfile: AudioProfileDefault,
  audioScenario: AudioScenarioDefault,
};

class Video extends Component {
  constructor(props) {
    super(props);
    this.state = {
      peerIds: [], //Array for storing ctcted peers
      uid: Math.floor(Math.random() * 100), //Generate a UID for local user
      appid: 'e76630b77d5d42408dc0e575f0aefbd5', //Enter the App ID generated from the Agora Website
      channelName: '1111122222', //Channel Name for the current session
      vidMute: false, //State variable for Video Mute
      audMute: false, //State variable for Audio Mute
      joinSucceed: false, //State variable for storing success
      //State variable for storing success
    };
    if (Platform.OS === 'android') {
      //Request required permissions from Android
      requestCameraAndAudioPermission().then(_ => {
        console.log('requested!');
      });
    }
    const configi = {
      //Setting config of the app
      appid: 'e76630b77d5d42408dc0e575f0aefbd5', //App ID
      channelProfile: 0, //Set channel profile as 0 for RTC
      videoEncoderConfig: {
        //Set Video feed encoder settings
        width: 720,
        height: 1080,
        bitrate: 1,
        frameRate: FPS30,
        orientationMode: Adaptative,
      },
      audioProfile: AudioProfileDefault,
      audioScenario: AudioScenarioDefault,
    };
    RtcEngine.init(configi);
    this.socket = Configuration.getConfiguration('Socket');

  }
  componentWillUnmount = () => {

    RtcEngine.destroy();
    if(this.socket){
      this.socket.removeListener('customer_end_video_socket');
    }

  };
  componentDidMount() {
    if(this.socket){
      this.socket.on('customer_end_video_socket', data => {
        this.endCall();
      });
    }

    RtcEngine.on('userJoined', data => {
      const {peerIds} = this.state; //Get currrent peer IDs
      if (peerIds.indexOf(data.uid) === -1) {
        //If new user has joined
        this.setState({
          peerIds: [...peerIds, data.uid], //add peer ID to state array
        });
      }
    });
    RtcEngine.on('userOffline', data => {
      //If user leaves
      this.endCall()
      RtcEngine.leaveChannel();
      this.setState({
        //  peerIds: [],
        peerIds: this.state.peerIds.filter(uid => uid !== data.uid), //remove peer ID from state array
      });
    });
    RtcEngine.on('joinChannelSuccess', data => {
      //If Local user joins RTC channel
      // console.log('data');
      RtcEngine.startPreview(); //Start RTC preview
      this.setState({
        joinSucceed: true, //Set state variable to true
      });
    }); //Initialize the RTC engine
  }
  /**
   * @name toggleAudio
   * @description Function to toggle local user's audio
   */
  toggleAudio() {
    let mute = this.state.audMute;
    // console.log('Audio toggle', mute);
    RtcEngine.muteLocalAudioStream(!mute);
    this.setState({
      audMute: !mute,
    });
  }
  /**
   * @name toggleVideo
   * @description Function to toggle local user's video
   */
  toggleVideo() {
    let mute = this.state.vidMute;
    //console.log('Video toggle', mute);
    this.setState({
      vidMute: !mute,
    });
    RtcEngine.muteLocalVideoStream(!this.state.vidMute);
  }
  /**
   * @name endCall
   * @description Function to end the call
   */
  endCall() {
    //RtcEngine.destroy();
    RtcEngine.leaveChannel();
    this.props.endCall()
    this.setState({ChildVideo: false, peerIds: [], joinSucceed: false});
    // Actions.home();
  }
  /**
   * @name peerClick
   * @description Function to swap the main peer videostream with a different peer videostream
   */
  peerClick(data) {
    let peerIdToSwap = this.state.peerIds.indexOf(data);
    this.setState(prevState => {
      let currentPeers = [...prevState.peerIds];
      let temp = currentPeers[peerIdToSwap];
      currentPeers[peerIdToSwap] = currentPeers[0];
      currentPeers[0] = temp;
      return {peerIds: currentPeers};
    });
  }
  /**
   * @name videoView
   * @description Function to return the view for the app
   */
  videoView() {
    return (
      <View style={[styles.max,{backgroundColor: 'transparent'}]}>
        {/* <Header
          style={[
            boxShadow('trasparent', {}, 0),
            {backgroundColor: Colors.white},
          ]}
          textStyle={{textAlign: 'center'}}
        /> */}
        <View style={{flex: 1, backgroundColor: Colors.primary}}>
          {this.state.peerIds.length > 1 ? (
            <View style={{flex: 1}}>
              <View style={{height: (dimensions.height * 3) / 4 - 50}}>
                <AgoraView
                  style={{flex: 1}}
                  remoteUid={this.state.peerIds[0]}
                  mode={1}
                  key={this.state.peerIds[0]}
                />
              </View>
              <View style={{height: dimensions.height / 4}}>
                <ScrollView
                  horizontal={true}
                  decelerationRate={0}
                  snapToInterval={dimensions.width / 2}
                  snapToAlignment={'center'}
                  style={{
                    width: dimensions.width,
                    height: dimensions.height / 4,
                  }}>
                  {this.state.peerIds.slice(1).map(data => (
                    <TouchableOpacity
                      style={{
                        width: dimensions.width / 2,
                        height: dimensions.height / 4,
                      }}
                      onPress={() => this.peerClick(data)}
                      key={data}>
                      <AgoraView
                        style={{
                          width: dimensions.width / 2,
                          height: dimensions.height / 4,
                        }}
                        remoteUid={data}
                        mode={1}
                        key={data}
                      />
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>
          ) : this.state.peerIds.length > 0 ? (
            <View style={{height: hp('90%'),
          }}>
              <AgoraView
                style={{flex: 1}}
                remoteUid={this.state.peerIds[0]}
                mode={1}
              />
            </View>
          ) : (
            <View
              style={{
                justifyContent: 'center',
                flex: 1,
                alignSelf: 'center',
                alignContent: 'center',
                height: hp('90%'),
              }}>
              <Text style={{color: '#ffffff'}}>Please wait for a while...</Text>
            </View>
          )}
          {/* {!this.state.vidMute ? ( //view for local video
            <AgoraView
              style={styles.localVideoStyle}
              zOrderMediaOverlay={true}
              showLocalVideo={true}
              mode={1}
            />
          ) : (
            <View />
          )} */}
        </View>
        <Button
          buttonStyle={{
            bottom: hp('5%'),
            marginHorizontal:16,
            backgroundColor:Colors.primary3,borderRadius:0}}
          onPress={() => this.endCall()} title={'Cancel'} />
      </View>
    );
  }
  render() {
    if (this.props.isVideo) {
      return this.videoView();
    } else {
      return <View></View>;
    }
  }
}
export default Video;
