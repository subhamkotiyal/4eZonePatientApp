import {
  GET_FEVORITE_TRAINER_SUCCESS,
  GET_FEVORITE_TRAINER_REQUEST,
  GET_FEVORITE_TRAINER_FAILURE,
} from './types';

export const getFevoriteTrainerRequest = () => ({
  type: GET_FEVORITE_TRAINER_REQUEST,
});

export const getFevoriteTrainerSuccess = data => ({
  type: GET_FEVORITE_TRAINER_SUCCESS,
  data,
});

export const getFevoriteTrainerFail = () => ({
  type: GET_FEVORITE_TRAINER_FAILURE,
});
