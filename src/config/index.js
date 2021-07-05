import { Platform } from 'react-native';
import {
  API_URL,
  BASE_URL,
  IOS_ANALYTICS_KEY,
  ANDROID_ANALYTICS_KEY,
} from 'react-native-dotenv';

export default {
  //API_URL:'http://ec2-34-230-239-61.compute-1.amazonaws.com:5004/api/v1/',
  API_URL:'http://api.4ezone.com/api/v1/',
  BASE_URL:'http://api.4ezone.com',
  ANALYTICS_KEY: Platform.select({
    ios: IOS_ANALYTICS_KEY,
    android: ANDROID_ANALYTICS_KEY,
  }),
  //GOOGLE_MAP_KEY:'AIzaSyBBn6MFdSJIvLUuuyo2pfoau76MzNCBErA',
GOOGLE_MAP_KEY:'AIzaSyCIStSm136tDP4Zqsv77LtV4Kkvlq_IFgM'
};
