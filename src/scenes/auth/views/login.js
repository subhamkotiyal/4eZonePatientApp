import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
  ScrollView,
  Keyboard,
  Platform,
} from 'react-native';
import appleAuth, {
  AppleButton,
  AppleAuthError,
  AppleAuthRequestScope,
  AppleAuthRealUserStatus,
  AppleAuthCredentialState,
  AppleAuthRequestOperation,
} from '@invertase/react-native-apple-authentication';
import CountryPicker,{Flag,getAllCountries,getImageFlagAsync, get, getAllCountriesCallingCode} from 'react-native-country-picker-modal'

import {Text, Button, TextInput, Card, SmallIcon} from '_atoms';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import PhoneInput from 'react-native-phone-input';
import {useDispatch, useSelector} from 'react-redux';
import {Validation, Methods, Images} from '_utils';

//fbsdk
import {
  LoginButton,
  AccessToken,
  LoginManager,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';

import {Typography, Colors, Mixins, AppStyles} from '_styles';
let {windowWidth, windowHeight, boxShadow, padding} = Mixins;
import {
  loginRequest,
  loginWithSocialRequest,
} from '../../../store/modules/login/actions';
import {LogoHeader, AuthButton} from '../templates';

// Component
const initialState ={countryCode: '+46',
countryName: 'SE',
mobileNumber:''
}
const Login = ({navigation}) => {
  const dispatch = useDispatch();
  /****************************** Get Store State & Hooks*************************************/
  let emailField, phoneRef;
  const [state, setState] = useState(initialState);
  const {language, fcmToken = 'No Token',basicSetting=null} = useSelector(state => ({
    language: state.switchLanguage.language,
    fcmToken: state.loginReducer.fcmToken,
    basicSetting:state.mobileReducer.basicSetting,

  }));
  const [credentialStateForUser, updateCredentialStateForUser] = useState(-1);
  const [visible, setVisible] = useState(false)
  const [filterCountries,setFilterCountries] = useState([])
  useEffect(()=>{
    filterAction()
  },[])

  //Google Config
  useEffect(() => {
    GoogleSignin.configure({});
  }, []);

  // Apple Login
  useEffect(() => {
    if (Platform.OS != 'android' && Platform.Version >= 13) {
      if (!appleAuth.isSupported) return;
      fetchAndUpdateCredentialState(updateCredentialStateForUser).catch(error =>
        updateCredentialStateForUser(`Error: ${error.code}`),
      );
    }
  }, []);
  useEffect(() => {
    if (Platform.OS != 'android' && Platform.Version >= 13) {
      if (!appleAuth.isSupported) return;
      return appleAuth.onCredentialRevoked(async () => {
        console.warn('Credential Revoked');
        fetchAndUpdateCredentialState(
          updateCredentialStateForUser,
        ).catch(error => updateCredentialStateForUser(`Error: ${error.code}`));
      });
    }
  }, []);
  /****************************** Validation *************************************/
  const ValidationRules = () => {
    let {mobileNumber = ''} = state;
    let {code} = language;
    return [
      {
        field: mobileNumber,
        name: 'Phone Number',
        rules: 'required|numeric|no_space|min:10',
        lang: code,
      },
    ];
  };
  const filterAction = async() => {
    const countries = await getAllCountries()
    const response = countries.filter((contry) =>{
      return contry.callingCode.length != 0 
    }).map((x)=> x.cca2)
    setFilterCountries(response)

  }
  /****************************** API Function *************************************/
  const pressButton = () => {
    let {mobileNumber = '', countryCode, countryName} = state;
    let validation = Validation.validate(ValidationRules());
    let {showToast} = Methods;
    //  navigation.navigate('EnterPassword');
    if (validation.length != 0) {
      showToast(validation[0].message, 'danger');
    } else {
      dispatch(
        loginRequest(countryCode, mobileNumber, countryName, navigation),
      );
      setTimeout(()=> setState({...state,...initialState}),1000)
    }
  };

  //Facebook Login
  const handleFacebookLogin = async () => {
    // await LoginManager.logOut()
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      result => {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          console.log('resuttttttt', result);
          console.log(
            'Login success with permissions: ' +
              result.grantedPermissions.toString(),
          );
          AccessToken.getCurrentAccessToken().then(data => {
            let accessToken = data.accessToken;
            const responseInfoCallback = (error, result) => {
              if (error) {
                alert('Error fetching data: ' + error.toString());
              } else {
                var api = `https://graph.facebook.com/v2.3/${result.id}?fields=name,email,picture&access_token=${accessToken}`;
                fetch(api)
                  .then(response => response.json())
                  .then(responseData => {
                    let data = {
                      googleId: '',
                      facebookId: responseData.id,
                      appleId: '',
                      name: responseData.name,
                      email: responseData.email,
                      fcmToken: fcmToken,
                      photo: responseData.picture.data.url,
                    };
                    socialLogin(data);
                  });
              }
            };

            const infoRequest = new GraphRequest(
              '/me',
              {
                accessToken: accessToken,
                parameters: {
                  fields: {
                    string: 'email,name,first_name,middle_name,last_name',
                  },
                },
              },
              responseInfoCallback,
            );
            // Start the graph request.
            new GraphRequestManager().addRequest(infoRequest).start();
          });
        }
      },
      function(error) {
        console.log('Login fail with error: ' + error);
      },
    );
  };

  //Google Login
  const googleAuth = async () => {
    let {showToast} = Methods;
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      await GoogleSignin.signOut();
      GoogleSignin.signIn()
        .then(user => {
          var fullname = user.user.givenName + ' ' + user.user.familyName;
          let data = {
            googleId: user.user.id,
            facebookId: '',
            appleId: '',
            name: fullname,
            email: user.user.email,
            photo: user.user.photo,
            fcmToken: fcmToken,
          };
          debugger;
          socialLogin(data);
          GoogleSignin.signOut();
        })
        .catch(err => {
          if (err.message) {
           // showToast(err.message, 'danger');
          }
          console.log('WRONG SIGNIN', err);
        })
        .done();
    } catch (error) {
      if (error.message) {
        showToast(error.message, 'danger');
      }
      console.log('WRONG SIGNIN', error);
    }
  };

  /**
   * Starts the Sign In flow.
   */
  async function onAppleButtonPress(updateCredentialStateForUser) {
    console.warn('Beginning Apple Authentication');
    if (Platform.OS != 'android' ) {
    if (!appleAuth.isSupported){
      return alert('Apple Login Not support')
    } 
      // start a login request
      try {
        const appleAuthRequestResponse = await appleAuth.performRequest({
          requestedOperation: AppleAuthRequestOperation.LOGIN,
          requestedScopes: [
            AppleAuthRequestScope.EMAIL,
            AppleAuthRequestScope.FULL_NAME,
          ],
        });
        const {
          user: newUser,
          email,
          nonce,
          identityToken,
          realUserStatus /* etc */,
        } = appleAuthRequestResponse;
        let data = {
          googleId: '',
          facebookId: '',
          appleId: appleAuthRequestResponse.user,
          name:
            appleAuthRequestResponse.fullName.givenName +
            ' ' +
            appleAuthRequestResponse.fullName.familyName,
          email: appleAuthRequestResponse.email,
          fcmToken: fcmToken,
        };
        socialLogin(data);
        fetchAndUpdateCredentialState(
          updateCredentialStateForUser,
        ).catch(error => updateCredentialStateForUser(`Error: ${error.code}`));
        if (identityToken) {
          // e.g. sign in with Firebase Auth using `nonce` & `identityToken`
          console.log(nonce, identityToken);
        } else {
          // no token - failed sign-in?
        }

        if (realUserStatus === AppleAuthRealUserStatus.LIKELY_REAL) {
          console.log("I'm a real person!");
        }

        console.warn(`Apple Authentication Completed, ${user}, ${email}`);
      } catch (error) {
        if (error.code === AppleAuthError.CANCELED) {
          console.warn('User canceled Apple Sign in.');
        } else {
          console.log(error.message);
        }
      }
    }
  }
  /**
   * Fetches the credential state for the current user, if any, and updates state on completion.
   */
  async function fetchAndUpdateCredentialState(updateCredentialStateForUser) {
    if (user === null) {
      updateCredentialStateForUser('N/A');
    } else {
      const credentialState = await appleAuth.getCredentialStateForUser(user);
      if (credentialState === AppleAuthCredentialState.AUTHORIZED) {
        updateCredentialStateForUser('AUTHORIZED');
      } else {
        updateCredentialStateForUser(credentialState);
      }
    }
  }

  //Save Socila Login
  const socialLogin = data => {
    let bodyData = {...data, ...state};
    dispatch(loginWithSocialRequest(bodyData, navigation));
  };

  /****************************** Function Main  *************************************/
  const handleChange = (value,name) => {
    setState(prevState => ({
      ...prevState,
      [name]:value
    }));
  };
  const onSelect = async (country) => {
     console.log(country,"countrycountry")
    setState(prevState => ({
      ...prevState,
      ['countryCode']: '+' + country.callingCode ,
      ['countryName']: country.cca2,
    }));
    setVisible(false)
  }


  /****************************** Render Main  *************************************/
  return (
    <View
      style={[
        {
          flex: 1,
          backgroundColor: Colors.white,
        },
      ]}>
        
      <ScrollView
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}

        contentContainerStyle={[padding(0)]}
        keyboardShouldPersistTaps={'never'}>
        <View style={{flex: 1}}>
          <View style={{height:windowHeight > 736? windowHeight / 2.5:windowHeight/2.5}}>
            <Image
              style={{
                width: '100%',
                height: '100%',
                overflow: 'visible',
              }}
             resizeMode={'cover'}
              source={Images.loginBGMain}></Image>
          </View>
          <View
            style={{
              height: windowHeight > 736 ? moderateScale(48) : moderateScale(65),
            }}
          />
          <View style={[padding(16, 16), {flex: 1}]}>
            <View style={{alignItems: 'center'}}>
              <Text
                style={[
                  AppStyles.text,
                  {
                    color: Colors.black,
                    fontSize: Typography.normalize(26),
                  },
                ]}>
                Welcome To
                <Text
                  style={[
                    AppStyles.bold,
                    {
                      color: Colors.black,
                    },
                  ]}>
                  {' '}
                  4E Health Center{' '}
                </Text>
              </Text>
            </View>
            <View style={{height: verticalScale(24)}} />

            {/*************** Phone Input field *******************/}
            <View
              style={[
                AppStyles.signUptile,
                {
                  ...boxShadow('black', {height: 1, width: 1}, 10, 0.2),
                },
              ]}>
              <TouchableOpacity 
              onPress={()=> setVisible(true)}
              style={{
                flex:windowWidth > 360 ? 0.35 :0.38,
                flexDirection:'row',
              }}>
                <Flag 
                countryCode={state.countryName}
                flagSize={16}
                style={{marginRight:0}}
                />
                <Text style={AppStyles.signUpcountryText}>
                  {state.countryCode}{' '} 
                </Text>
                <Image
                  source={Images.selectnumber}
                  style={AppStyles.signUpselectnumber}
                />
              </TouchableOpacity>
              <View style={AppStyles.signUpphoneInput}></View>

              <TextInput
                inputMenthod={ref => {
                  phoneRef = ref;
                }}
                initialCountry={state.countryName}
                returnKeyType={'done'}
                value={state.mobileNumber}
                 placeholder={'Phone Number'}
                 keyboardType={'numeric'}
                 viewTextStyle={[AppStyles.signUptile,{
                   borderRadius:0,
                   flex:0.5,
                   borderWidth:0,
                   borderColor:'white',
                   height: moderateScale(48),
                   ...boxShadow('transparent', {height: 0, width: 0}, 0, 0),
                 }]}
                 textInputStyle={[
                {
                    height: moderateScale(48),

                  }

                ]}
                onChangeText={(text)=> handleChange(text,'mobileNumber')}
                offset={scale(28)}
              />
            </View>
          </View>
          {/*************** Login Button  *******************/}
          <BottomAbsoluteButton
            image={Images.next}
            customeStyle={{bottom: -windowHeight / 6}}
            onPress={() => pressButton()}
          />
        </View>

        <View
          style={{
            height: windowHeight > 671 ? windowHeight / 8 : windowHeight / 14,
          }}
        />

{basicSetting && basicSetting.socialLogin && <View
          style={{
            flex: 1,
            alignItems: 'center',
            marginTop: moderateScale(48),
          }}>
          <Text
            p
            style={[
              {
                fontSize: Typography.normalize(18),
                color: '#777',
              },
            ]}>
            or connect with social
          </Text>
        </View>}

        {/*************** Social Button *******************/}
        <View style={{height: moderateScale(16)}} />

       {basicSetting && basicSetting.socialLogin && <View
          style={[
            AppStyles.rowSpaceBetween,
            {
              paddingHorizontal: moderateScale(32),
            },
          ]}>
            {Platform.OS == 'android' && <View style={{flex:0.1}}/>}
          <TouchableOpacity style={{flex: 0.3}} onPress={() => googleAuth()}>
            <SmallIcon
              source={Images.googleIcon}
              style={AppStyles.size48Image}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleFacebookLogin()}
            style={{flex: 0.3}}>
            <SmallIcon source={Images.fbIcon} style={AppStyles.size48Image} />
          </TouchableOpacity>

          {Platform.OS == 'ios' ? <TouchableOpacity
            onPress={() => onAppleButtonPress(updateCredentialStateForUser)}
            style={{flex: 0.3}}>
            <SmallIcon
              source={Images.appleicon}
              style={AppStyles.size48Image}
            />
          </TouchableOpacity> :<View style={{flex:0.1}}/>}
        </View>}
        <View style={{height: verticalScale(16)}} />
      </ScrollView>
      {visible && 
  <CountryPicker
  {...{
    onSelect ,
  }}
  countryCodes={filterCountries}
  withFilter
  withFlag
  ref={ref => countryRef = ref}
  onClose={()=>setVisible(false)}
  containerButtonStyle={{marginTop:8}}
  visible={visible}
  
/>}
    </View>
  );
};

export default Login;
