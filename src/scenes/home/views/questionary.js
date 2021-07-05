import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  PermissionsAndroid,
  FlatList,
  ScrollView,
  Image,
  ImageBackground,
  Keyboard,
} from 'react-native';
import {ListEmptyComponent, BottomAbsoluteButton} from '_molecules';
import {
  BallIndicator,
  BarIndicator,
  PacmanIndicator,
} from 'react-native-indicators';
import Modal from 'react-native-modal';
import {useDispatch, useSelector} from 'react-redux';
import {showToast} from '_utils/methods';
import {Text, Button, TextInput, Header, SmallIcon, Card, Label} from '_atoms';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {Images} from '_utils';
import {Typography, Colors, Mixins, AppStyles} from '_styles';
let {boxShadow, padding, windowWidth, windowHeight} = Mixins;
import {getAllQuestionaryRequest} from '../../../store/modules/questionary/actions';
import Config, {SUCCESS} from '_utils/constants/apiConstant';

import {Request} from '_services';

// Component
const Questionary = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {questionary = [], totalQuestionary, profileData = {}} = useSelector(
    state => ({
      questionary: state.questionaryReducer.questionary,
      profileData: state.getProfileReducer.profileData,
      totalQuestionary: state.questionaryReducer.questionary.length,
    }),
  );
  const [loading, setLoading] = useState(false);
  const [step, setState] = useState(0);
  const [answers, setAnswerData] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState([]);

  const [selectAnswer, setAnswer] = useState(null);
  /****************************** Api Function Main  *************************************/
  useEffect(() => {
    getAllQuestionary();
  }, []);

  //Get all questionary data
  const getAllQuestionary = () => {
    if (route && route.params) {
      let {specialistId} = route.params;
      let data = {};
      data['specialistId'] = specialistId;
      dispatch(getAllQuestionaryRequest(data, callBackFxn));
    }
  };
  //Call back to get answer
  const callBackFxn = questions => {
    console.log(questions, 'questions');
    if (questions && questions.length > 0) {
      getAnswerByQuestionId(questions[step]._id);
    }
  };

  //Get All answer by Question
  const getAnswerByQuestionId = async questionId => {
    try {
      let data = {};
      data['questionId'] = questionId;
      const answerData = await Request.post(
        `${Config.getAnswerByQuestionId}`,
        data,
      );
      console.log(answerData, 'answerDataanswerData');
      if (answerData.status == SUCCESS) {
        setAnswerData(answerData.data);
        setLoading(false);
      }
    } catch (err) {
      showToast(err.message, 'danger');
      setLoading(false);
    }
  };

  //Submit user answer
  const submitUserAnswer = async () => {
    debugger
    if (selectAnswer) {
      setLoading(true);
      try {
        let data = {
          question: questionary[step].questionName,
          answer: selectAnswer.option,
        };
        if (totalQuestionary-1  > step) {
          let newArray =[...selectedAnswer,data]
          setSelectedAnswer(newArray)
          getAnswerByQuestionId(questionary[step + 1]._id);
          setState(step + 1);   
          setAnswer(null)
                 
        } else {
          showToast('All Done', 'success');
          let newArray =[...selectedAnswer,data]
          navigation.navigate('Schedule',{
            ...route.params,
            questionaire:newArray
          })
          setLoading(false);
        }
        
      } catch (err) {
        showToast(err.message, 'danger');
        setLoading(false);
      }
    } else {
      showToast('Please select answer first', 'danger');
    }
  };
  /****************************** Component Function Function Main  *************************************/
  const updateQuestinaryStep = () => {
    submitUserAnswer();
  };
  /****************************** Render Child  *************************************/
  const HomeHeader = ({locations}) => {
    return (
      <ImageBackground
        resizeMode={'stretch'}
        style={{height: windowHeight / 3.5, width: '100%'}}
        source={Images.profilebg}>
        <View style={{height: moderateScale(2)}} />

        <Header
          leftText
          title={''}
          image={Images.backwhite}
          style={{backgroundColor: '#499FD2'}}
        />
        <View style={{height: moderateScale(8)}} />

        <View
          style={{
            paddingHorizontal: moderateScale(24),
            paddingVertical: moderateScale(16),
          }}>
          <Text
            p
            style={{
              color: 'rgba(255,255,255,0.96)',
              fontSize: Typography.normalize(26),
            }}>
            {route.params ? route.params.specialistName : ''}
          </Text>
          <Text
            style={{
              color: 'rgba(255,255,255,0.9)',
              fontSize: Typography.normalize(12),
            }}>
            Please answer the question to the best of your knowledge
          </Text>
        </View>
      </ImageBackground>
    );
  };

  // Card Images
  const AnswerItem = ({item, index}) => {
    return (
      <TouchableOpacity 
      activeOpacity={0.9}
      onPress={() => setAnswer(item)}>
        <Card
          cardStyle={{
            ...boxShadow('black', {}, 2, 0.3),
            backgroundColor: 'white',
            flex: 1,
            marginVertical: 8,
            marginHorizontal: 2,
            flexDirection: 'row',
            borderRadius: 8,
            alignItems: 'flex-start',
          }}>
          <View style={{flex: 1}}>
            <Text
              h6
              style={{color: Colors.black, fontSize: Typography.normalize(16)}}>
              {item.option}
            </Text>
          </View>

          {selectAnswer && selectAnswer._id == item._id && (
            <View style={{flex: 0.1}}>
              <Image
                source={Images.listtick}
                style={{
                  height: moderateScale(18),
                  width: moderateScale(16),
                }}
              />
            </View>
          )}
        </Card>
      </TouchableOpacity>
    );
  };

  /****************************** Render Main  *************************************/
  return (
    <View style={[{flex: 1, backgroundColor: Colors.white}]}>
      <ScrollView 
            showsVerticalScrollIndicator={false}

      contentContainerStyle={[{backgroundColor: 'white'}]}>
        <HomeHeader />
        {/************** Questionary Step By Step  **************/}
        <View
          style={{
            flex: 1,
            paddingHorizontal: moderateScale(24),
          }}>
          {questionary.length > 0 && (
            <Label
              labelStyle={{fontSize: Typography.normalize(18)}}
              title={`${questionary[step].questionName}`}
            />
          )}

          <View style={{height: moderateScale(16)}} />
          <FlatList
            style={{backgroundColor: 'rgba(246, 250, 253, 0.4)'}}
            data={answers}
            renderItem={({item, index}) => (
              <AnswerItem item={item} index={index} />
            )}
            ListEmptyComponent={() => (
              <ListEmptyComponent message={'No data found!'} />
            )}
          />
        </View>
      </ScrollView>
      {answers && answers.length > 0 && (
        <BottomAbsoluteButton
          image={Images.next}
          customeStyle={{bottom: moderateScale(10)}}
          onPress={() => updateQuestinaryStep()}
        />
      )}
      {/************** Open Loader modal  **************/}
      {loading && (
        <View style={AppStyles.parentContainer}>
          <Modal isVisible={loading}>
            <View style={AppStyles.loadercontainer}>
              <View style={{marginLeft: 30}}>
                <BallIndicator color={Colors.primary} size={30} />
              </View>
              <View style={{width: 210, paddingLeft: 20}}>
                <Text style={{color: '#000000', fontSize: 16}}>
                  Please wait while we process your request
                </Text>
              </View>
            </View>
            <View></View>
          </Modal>
        </View>
      )}
    </View>
  );
};

export default Questionary;
