import {
  GET_NERBY_TRAINER_REQUEST,
  GET_NERBY_TRAINER_SUCCESS,
  GET_NERBY_TRAINER_FAILURE,
  GET_TRAINER_SESSION_REQUEST
} from './types';

export const getNearbyTrainerRequest= data => ({
  type: GET_NERBY_TRAINER_REQUEST,
  data,
});

export const getNearbyTrainerSuccess = data => ({
  type: GET_NERBY_TRAINER_SUCCESS,
  data,
});
export const getNearbyTrainerFail = () => ({
  type: GET_NERBY_TRAINER_FAILURE,
});



export const getTrainersSessionRequest= data => ({
  type: GET_TRAINER_SESSION_REQUEST,
  data,
});
