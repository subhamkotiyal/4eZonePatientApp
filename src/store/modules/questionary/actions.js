import {
  GET_QUESTIONARY_REQUEST,
  GET_QUESTIONARY_SUCCESS,
  GET_QUESTIONARY_FAILURE,
} from './types';

export const getAllQuestionaryRequest= (data,callBackFxn) => ({
  type: GET_QUESTIONARY_REQUEST,
  data,
  callBackFxn
});

export const getAllQuestionarySuccess = data => ({
  type: GET_QUESTIONARY_SUCCESS,
  data,
});
export const getAllQuestionaryFail = () => ({
  type: GET_QUESTIONARY_FAILURE,
});

