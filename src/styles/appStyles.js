// App styles
import {
  StyleSheet
} from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  Typography,
  Colors,
  Mixins
} from '_styles';
let {
  boxShadow,
  windowWidth,
  padding,
  windowHeight
} = Mixins

let {
  FONT_REGULAR,
  FONT_BOLD,
  FONT_MEDIUM
} = Typography

export default AppStyles = StyleSheet.create({
  text: {
    ...FONT_REGULAR,
    color: Colors.textColor,
  },
  bold: {
    ...FONT_BOLD,
    color: Colors.textColor
  },
  medium: {
    ...FONT_MEDIUM,
    color: Colors.textColor,

  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  col: {
    flex: 1,
    marginTop: 8,
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  columnWithHalfFlex: {
    flex: 0.5, flexDirection: 'column'
  },
  centerView: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  borderTopCard: {
    flex: 1,
    // marginVertical: 6,
    borderTopColor: Colors.primary,
    borderTopWidth: 2,
    borderRadius: 8,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderRightColor: 'white',
    borderLeftColor: 'white',
    backgroundColor: 'white'

  },
  lowSize: {
    fontSize: Typography.normalize(13)
  },

  lineHeightPass: { lineHeight: 24, },
  column: {
    flexDirection: 'column',

  },
  topTitle: { color: 'rgba(0,0,0,0.75)', fontSize: Typography.normalize(16) },

  //contact style
  imageStyle: {
    width: '100%',
    height: '100%'
  },
  imageViewStyle: {
    height: scale(150),
    justifyContent: 'center'
  },
  subView: {
    justifyContent: 'center',
    alignItems: 'center',

  },
  headingView: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: moderateScale(32),
    paddingBottom: moderateScale(24),
  },
  contactText: {
    fontSize: Typography.normalize(16),
    textAlign: 'center',
    color: Colors.textColor,
    lineHeight: 20

  },
  textHeading: {
    fontSize: Typography.normalize(18),
    fontWeight: '500',
    color: Colors.black
  },

  flexHalfPlus: { flex: 0.9, flexDirection: 'column', },
  blurColor: { color: 'rgba(0,0,0,0.44)', fontSize: Typography.normalize(13) },
  row: {
    flexDirection: 'row',
  },
  bottomModal: {
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    justifyContent: 'flex-end',
    margin: 0,
    zIndex: 100,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowColor: 'rgba(0,0,0,0.11)',
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 1,
  },
  bottomRadiusModal: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: windowHeight / 1.5,
    paddingVertical: 4,

  },
  modalBottomContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    // borderTopRightRadius: 15,
    // borderTopLeftRadius: 15,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  imagePassStyle: { flex: 0.05, paddingTop: 4, },
  infoView: {
    alignSelf: 'flex-start', paddingTop: 2,
  },
  paddPass: {
    paddingVertical: 8
  },
  infoText: {
    color: 'rgba(0,0,0,0.5)',
    fontSize: Typography.normalize(12), paddingHorizontal: 8
  },
  blurRectangular: {
    borderRadius: 6,
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.03)'
  },
  orView: {
    flexDirection: "row",
    flex: 1
  },
  subLabelStyle: { paddingTop: 16, paddingBottom: 8 },
  labelStyleHow: {
    fontSize: Typography.normalize(14),
    ...FONT_BOLD
  },
  paraStyle: {
    fontSize: Typography.normalize(13),

  },

  paddPassView: {
    paddingVertical: 4
  },
  savedSearch: {
    height: windowHeight / 15,
    marginHorizontal: windowHeight / 52,
    paddingHorizontal: 8,
    borderRadius: 10,
    justifyContent: 'space-between',
    borderColor: 'rgba(0,0,0,0.08)',
    flexDirection: 'row',
    backgroundColor: 'white'
  },
  lineOne: {
    height: 1,
    backgroundColor: "rgba(0,0,0,0.2)"
  },
  profileText: {
    color: Colors.lightblack,
    fontSize: Typography.normalize(13),
  },
  claimContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(16),
    paddingBottom: verticalScale(8),
    paddingTop: verticalScale(16)
  },
  invoiceContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(4),
    paddingBottom: verticalScale(4),
    paddingTop: verticalScale(4)
  },
  claimRightView: {
    paddingTop: moderateScale(4),
    paddingLeft: moderateScale(16),
    alignItems: 'flex-end',
    flex: 0.5
  },
  invoiceRightView:{
    paddingTop: moderateScale(4),
    paddingLeft: moderateScale(16),
    alignItems: 'flex-end',
    flex: 0.5
  },
  textSmall: { color: Colors.textColor, fontSize: Typography.normalize(12) },
  text13: {
    color: Colors.black,
    fontSize: Typography.normalize(13)
  },
  text18: {
    color: Colors.textColor,
    fontSize: Typography.normalize(18)
  },


  followText: {
    color: Colors.black,
    fontSize: Typography.normalize(22)
  },
  followContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: moderateScale(16)
  },
  followRightRow: {
    flex: 0.6,
    justifyContent: 'center',
    paddingHorizontal: moderateScale(16)
  },
  followLeftRow: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },

  followIcon: {
    height: moderateScale(28), width: moderateScale(28),
    alignSelf: 'flex-end'
  },
  donePayIcon: {
    height: moderateScale(48), width: moderateScale(48),
    alignSelf: 'flex-start'
  },
  infoImage:{
    height: moderateScale(12), width: moderateScale(12),
    alignSelf: 'flex-start'
  },
  donePayWithIcon: {
    height: moderateScale(14), width: moderateScale(14),
    // alignSelf: 'flex-start',
  },
  doneCartIcon: {
    height: moderateScale(16),
     width: moderateScale(16),
  },
  doneCartPaywithIcon: {
    height: moderateScale(14), 
    width: moderateScale(14),
    // alignSelf: 'flex-end'
  },
  donePayText: {
    //  paddingTop:8
    // lineHeight:20
  },
  doneLeftRow: {
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  doneContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: moderateScale(16)
  },
  donePayContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  doneRightRow: {
    flex: 0.4,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  donePriceTextView: {
    paddingHorizontal: moderateScale(8),
    alignItems: 'center'
  },


  sendToContainer: {
    justifyContent: 'center',
    flex: 1,
    paddingVertical: moderateScale(16),
    paddingHorizontal: moderateScale(16)
  },
  sendToPayText: {
    color: Colors.textColor,
    fontSize: Typography.normalize(16)
  },
  sendGymPayText: {
    color: Colors.textColor,
    fontSize: Typography.normalize(13)
  },
  thankyouRating: {
    alignSelf: 'center',
    paddingBottom: moderateScale(12),
    paddingTop: moderateScale(8)
  },



  leftSection: {
    flex: 0.8,
    justifyContent: 'center'
  },
  lineAlign: {
    flex: 0.48,
    justifyContent: "center"
  },
  bottomSpace2: {
    height: 8,
    backgroundColor: 'rgba(0,0,0,0.06)',
  },
  bottomSpace6: {
    height: 8,
    backgroundColor: 'rgba(0,0,0,0.04)',
  },
  bottomSpace3: {
    height: 16,
    backgroundColor: 'rgba(0,0,0,0.06)'
  },
  bottomSpace4: {
    height: 8,
    backgroundColor: 'rgba(0,0,0,0.06)'
  },
  padding168: {
    paddingHorizontal: 16, paddingVertical: 8
  },
  viewTextStyle: {
    backgroundColor: "white",
    borderRadius: scale(48)/2,
    ...boxShadow('black',
    {height:0,width:1},2,0.2),

  },
  viewAddressTextStyle: {
    backgroundColor: "white",
    borderRadius: scale(0),
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
    borderBottomWidth: 1,
    ...boxShadow('black', { height: 0, width: 0 }, 0, 0.0),
    height: 42,
    paddingHorizontal: 0,
  },
  viewPromoTextStyle: {
    backgroundColor: "white",
    borderRadius: scale(2),
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
    borderBottomWidth: 1,
    ...boxShadow('black', { height: 0, width: 0 }, 1, 0.2),
    height: 42,
    justifyContent:'center',
    alignItems:'center',
    marginHorizontal: moderateScale(8),
  },
  viewReplyTextStyle: {
    backgroundColor: "rgba(248, 248, 248, 0.1)",
    borderRadius: scale(0),
    ...boxShadow('black', { height: 1, width: 0 }, 0.5,0.1),
    height: windowHeight / 2.5,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: moderateScale(16),
    paddingHorizontal: 0,
  },
  viewDisputeTextStyle:{
    backgroundColor: "white",
    borderRadius: scale(0),
    backgroundColor: "rgba(248, 248, 248, 0.2)",
    borderBottomWidth: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    ...boxShadow('black', { height: 0, width: 0 }, 0, 0.0),
    height: windowHeight / 8,
    paddingHorizontal: 0,
  
  },
  viewRatingTextStyle: {
    backgroundColor: "white",
    borderRadius: scale(8),
    ...boxShadow('black', { height: 1, width: 0 }, 6, 0.1),
    height: windowHeight / 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    // paddingTop: moderateScale(12),
    marginHorizontal: moderateScale(24),
  },
  forgotPassView: {
    justifyContent: "flex-end",
    alignItems: "flex-end"
  },
  forgotPassView2: {
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  buttonView: {
    backgroundColor: 'rgba(245,105,105,0.08)',
    flex: 0.3,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    height: windowHeight / 18
  },
  phoneCode: {
    borderRadius: 4,
    height: windowHeight / 14.4,
    borderWidth: 1,
    backgroundColor: 'white',
    paddingHorizontal: 8,
    alignSelf: 'center'
  },
  homeLabelView: {
    alignItems: 'flex-start'
  },
  bottomButton: {
    flex: 0.1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row',
    paddingVertical: 4,
  },
  //Signup
  phoneSearchSignpTextInput: {
    height: moderateScale(48),
    borderColor: 'gray',
    borderRadius: 0,
    width: '100%',
    color:'#000000'
  },

  signUptile: {
    height: moderateScale(48),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: verticalScale(8),
    flex: 1,
    // borderColor: 'rgba(0,0,0,0.11)',
    backgroundColor: "white",
    borderRadius: scale(8),
    ...boxShadow('black',{height:0,width:0},1,0.2),

  },
  signUpselectnumber: {
    height: moderateScale(7),
    width: moderateScale(7),
    alignSelf:'center',
    right:4
  },
  signUpphoneInput: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    height: '100%',
    width: 2,
    // position: 'absolute',
    // left: windowWidth / 5.0,
    top: 0,
  },
  signUpcountryText:{
    color:Colors.black,
    fontSize: Typography.normalize(16),
    ...Typography.FONT_BOLD,
    right:8
  },
  signUpdropTextView:{
    position: 'absolute', flex: 0.1,
    flexDirection: 'row',
    justifyContent:'center',
    alignItems:'center',
    
    left: windowWidth / 12,
  },
  signUpflag: {
    height: scale(8),
    width: scale(14),
    borderRadius: 0,
    alignSelf:'center',
    borderWidth: 0,
  },
  //Login
  phoneSearchTextInput: {
    height: moderateScale(48),
    // borderColor: 'gray',
    borderRadius: 0,
    width: '100%',
    color: 'white'

  },
  tile: {
    height: moderateScale(48),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: moderateScale(48) / 8,
    paddingHorizontal: verticalScale(8),
    flex: 1,
    backgroundColor: 'white',
    ...boxShadow('black',{height:1,width:1},5,0.4),

  },
  countryCode: {
    height: moderateScale(7),
    width: moderateScale(7),
  },
  phoneInput: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    height: '100%',
    width: 1,
    position: 'absolute',
    left: windowWidth / 6,
    top: 0,
  },
  flag: {
    height: scale(16),
    width: scale(28),
    borderRadius: 0,
    borderWidth: 0,
  },
  orLine: {
    height: 1,
    marginTop: moderateScale(6),
    backgroundColor: 'rgba(255,255,255,0.2)', flex: 0.5
  },
  orTile: {
    //height: 25,
    //marginTop: Platform.OS === 'ios' ? wp('8.10%') : wp('5%'),
    //marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orText: {
    color: '#A4A8A9',
    fontSize: Typography.normalize(14)
  },
  size48Image: {
    height: moderateScale(48),
    width: moderateScale(48)
  },
  otp: {
    backgroundColor: Colors.background,
    width: 'auto',
    height: 50,
    marginTop: 30,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  otpInput: {
    width: 40,
    height: 50,
    paddingBottom: 0,
    borderBottomWidth: 1,
    fontSize: wp('8%'),
    marginHorizontal: 5,
  },
  gridViewBackground: {
    width: '100%',
    marginTop: 10,
    borderColor: '#f5f6f8',
    backgroundColor: Colors.background,
  },
  otpHeading: {
    backgroundColor: 'transparent',
    width: 'auto',
    height: 'auto',
    marginTop: 20,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  otpText: {
    fontSize: Typography.normalize(16),
    color:'rgba(0,0,0,0.65)',
    ...Typography.FONT_THIN,

  },
  shadowBlur: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 0.2,
    elevation: 0.5,
    backgroundColor: 'white',
  },
  datePickerStyle:{
    alignItems:'flex-end',paddingHorizontal:16,
    height:52,backgroundColor:'white',
    shadowOpacity: 0.3,
    justifyContent:'center',
  shadowRadius: 1,
  elevation: 0.5,
  },
  btnView:{
      backgroundColor:'white',
      paddingVertical:moderateScale(5),
      justifyContent:'center',alignItems:'center',
      flex:0.3,

  },
  viewAddressTextSchStyle: {
    backgroundColor: "white",
    borderRadius: scale(0),
    ...boxShadow('black',{height:1,width:0},0.1,0.05),
    height:32,
    paddingHorizontal:0,
  },
  schTextInputStyle:{
    fontSize: Typography.normalize(14)

  },
  viewaddaddressTextSchStyle: {
    backgroundColor: "white",
    borderRadius: scale(0),
    ...boxShadow('black',{height:1,width:0},0.1,0.1),
    height:48,
    flex:1,
    paddingHorizontal:0,
  },
  viewaddaddStyle: {
    backgroundColor: "white",
    borderRadius: scale(0),
    ...boxShadow('black',{height:1,width:0},1,0.1),
    height:48,
    flex:1,
    paddingHorizontal:0,
  },
  detailContainer:{top:-25,zIndex:1000,
    borderTopEndRadius:30,
    paddingHorizontal:moderateScale(16),
    paddingVertical:16,
    borderTopStartRadius:30,
    shadowOffset:{height:0,width:1},
      shadowRadius:5,
  shadowOpacity:0.5,
    backgroundColor:'white',
    height:'100%'},
  parentContainer: {position: 'absolute'},
  loadercontainer: {
    height: 80,
    width: 270,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    opacity: 0.7,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    //paddingLeft: 30,
    flexDirection: 'row',
  },
  addschTextInputStyle:{
    fontSize: Typography.normalize(14),
    paddingHorizontal:12
  },
  activesaveAddress:{
    flex:0.2,
              borderRadius:16,
              alignItems:'center',
              backgroundColor:Colors.primary
  },
  inactivesaveAddress:{
    flex:0.2,
    borderRadius:16,
    alignItems:'center',
    borderColor:Colors.textColor,borderWidth:1}
});

