import {
  ADD_FEVORITE_TRAINER_SUCCESS,
  ADD_FEVORITE_TRAINER_REQUEST,
 ADD_FEVORITE_TRAINER_FAILURE,
} from './types';

import {
  REMOVE_FEVORITE_TRAINER_SUCCESS,
  REMOVE_FEVORITE_TRAINER_REQUEST,
 REMOVE_FEVORITE_TRAINER_FAILURE,
} from './types';

export const addFevoriteTrainerRequest = data => ({
  type: ADD_FEVORITE_TRAINER_REQUEST,
  data,
});

export const addFevoriteTrainerSuccess = (data,api) => ({
  type: ADD_FEVORITE_TRAINER_SUCCESS,
  data,
  api
});

export const addFevoriteTrainerFail = () => ({
  type: ADD_FEVORITE_TRAINER_FAILURE,
});


export const removeFevoriteTrainerRequest = data => ({
  type: REMOVE_FEVORITE_TRAINER_REQUEST,
  data,
});

export const removeFevoriteTrainerSuccess = data => ({
  type: REMOVE_FEVORITE_TRAINER_SUCCESS,
  data,
});

export const removeFevoriteTrainerFail = () => ({
  type: REMOVE_FEVORITE_TRAINER_FAILURE,
});
