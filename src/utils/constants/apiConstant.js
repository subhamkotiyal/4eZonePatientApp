const ApiConstant = {
    Login: 'user/login',
    Register: 'Signup',
    Password: 'Password',
    VerifyOTP: 'VerifyOTP',
    ChangePassword: 'ChangePassword',
    ChangePasswordProfile: 'ChangePasswordProfile',
    SideMenu: 'SideMenu',
    Review: 'Review',
    UpcomingEvents: 'UpcomingEvents',
    Profile: 'Profile',
    EditProfile: 'EditProfile',
    InRoute: 'InRoute',
    Chat: 'Chat',
    PastEvents: 'PastEvents',
    RequestForm: 'RequestForm',
    ModelList: 'ModelList',
    MapSearchScreen: 'MapSearchScreen',
    PreferredScreen: 'PreferredScreen',
    MyTripScreen: 'MyTripScreen',
    Invite: 'Invite',
    CouponScreen: 'CouponScreen',
    AccountDetailScreen: 'AccountDetailScreen',
    Emergency: 'Emergency',
    ProfileScreen: 'ProfileScreen',
    WalletScreen: 'WalletScreen',
    About: 'About',
    Support: 'Support',

    URL: 'http://3.21.130.136:5004/',
    doctorNearby:'user/doctor/nearby',
    doctorDetail:'user/doctor/details',

    getAllSpecialist:'specialist/getAllSpecialist',
    searchSpecialist:'specialist/searchSpecialist',
    getAllQUestion:'question/getAllQUestion',
    getAddress:'user/address',
    addAddress:'user/addaddress',
    addressdefault:'user/addressdefault',
    feedbackbycustomer:'user/feedbackbycustomer',
    startVideocalling:'user/startVideocalling',
    endVideocalling:'user/endVideocalling',

    changeCustomerOrderStatus:"user/changeCustomerOrderStatus",
    getAllCustomerBooking:"user/getAllCustomerBooking",



    getAnswerByQuestionId:'question/getAllAnswer',
    submitUserAnswer:'question/userAnswer',
    getbasicinfo:'adminSetting/getbasicinfo',
    addFevoriteGym:'gym/addFavouriteGym',
    removeFevoriteGym:'gym/removeFavouriteGym',
    getAllFavourite:'gym/getAllFavourite',
    checkFavourite:'gym/checkFavourite',
    nearbyTrainer:'trainer/getNearbyTrainer',
    addFavouriteTrainer:'trainer/addFavouriteTrainer',
    removeFavouriteTrainer:'trainer/removeFavouriteTrainer',
    checkFavouriteTrainer:'trainer/checkFavourite',
    getAllFavouriteTrainer:'trainer/getAllFavourite',

    getTrainerSession:'trainer/getSession',
    getGymTrainer:'gym/getTrainer',
    getGymSession:'gym/getSession',

    verfiyMobile: 'user/login',
    resendotp: 'user/resendotp',
    register: 'user/register',
    loginMobile: 'user/password',
    updateprofile: 'user/updateprofile',
    profileimage: 'user/upload',
    changepassword: 'user/changepassword',
    resetpassword: 'user/resetpassword',
    userPOS: 'payment/addpos',
    paymentMethodList: 'payment/poslist',
    deletePOS: 'payment/deletepos',
    estimatedCost: 'trip/estimatedcost',
  
    addBooking:'user/addorder',
    getBooking:'user/orderhistory',
    checkDispute:'booking/checkDispute',
    checkReview:'booking/checkReview',
    addbookingtrainer:'booking/addbookingtrainer',
    getPastBooking:'booking/getPastBooking',
    getUpcomingBooking:'booking/getUpcomingBooking',
    getCompletedDispute:'gym/getPastDispute',
    getInProcessDispute:'gym/getUpcomingDispute',
    addGymDispute:'gym/addDispute',
    addTrainerDispute:'trainer/addDispute',
    getDisputeById:'gym/getDisputeById',
    updateDispute:'gym/addDisputeReply',
    gymchathistory:'user/gymchathistory',
    trainerchathistory:'user/trainerchathistory',


    
    feedbackByCustomerToGym:'booking/feedbackByCustomerToGym',
    feedbackByCustomerToTrainer:'booking/feedbackByCustomerToTrainer',
    helpandsupport:'admin/helpandsupport',
    allPromosURL: 'promo/visibleList',
    addMoney: 'payment/addmoney',
    emergencyContactList: 'user/getcontact',
    addEmergencyContact: 'user/addcontact',
    deleteEmergencyContact: 'user/removecontact',
  
    addTripURL: 'trip/addtrip',
    cancelTripURL: 'trip/customercancel',
    getTripRequestURL: 'trip/user/tripdetails/',
    ratingTripURL: 'trip/feedbackcustomer',
    panicURL: 'user/panicsms',
    preferDriverURL: 'trip/user/addpreferdriver',
    validatePromoCodeURl: 'promo/validatepromocode',
    preferDriverListURL: 'trip/user/preferdriverslist',
    allTripsURL: 'trip/user/alltrips',
    loginWithSocialURl: 'user/acknowledgeSocialRegistration',
    supportEmailURL: 'user/support',
    logout:'user/logout',
    forgotPassword: 'manager/forgotpassword',
    profile: 'user/profile',
    addEvent: 'event/addevent',
    eventManagerUpcoming: 'event/eventManagerUpcoming',
    eventManagerPast: 'event/eventManagerPast',
    eventDetail: 'event/eventdetail',
    checkChat: 'chat/checkChat',
    kHeaderValues: {
      'Content-Type': 'application/json',
    },
    kMethodPostKey: 'post',
    kMethodGetKey: 'get',
    apiTypePost: 'post',
    apiTypeGet: 'get',
    responseType: 'json',
  
    DRIVER_FINDING_TRIPS: 'FindingTrips',
    TRIP_ON_TRIP: 'OnTrip',
    TRIP_PICKUP_INROUTE: 'PickupInroute',
    TRIP_ARRIVED: 'PickupArrived',
    TRIP_DESTINATION_INROUTE: 'DestinationInroute',
    TRIP_FINDING: 'FindingDrivers',
    TRIP_COMPLETED: 'Completed',
    TRIP_SCHEDULED: 'Scheduled',
    TRIP_CANCELLED: 'Cancelled',
    TRIP_WAITING_DRIVER: 'WatingForDriver',
    DRIVER_OFFLINE: 'Offline',
    DRIVER_POOL_TRIPS: 'OnPoolTrip',
  };
  
  export const SUCCESS = 'success';
  export const FAILURE = 'failure';
  
  export default ApiConstant;
  