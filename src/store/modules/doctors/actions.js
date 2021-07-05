import {
  GET_NERBY_DOCTOR_REQUEST,
  GET_NERBY_DOCTOR_SUCCESS,
  GET_NERBY_DOCTOR_FAILURE,
} from './types';

export const  getNearbyDoctorRequest= (data,cb) => ({
  type: GET_NERBY_DOCTOR_REQUEST,
  data,
  cb:cb
});

export const  getNearbyDoctorSuccess = data => ({
  type: GET_NERBY_DOCTOR_SUCCESS,
  data,
});
export const  getNearbyDoctorFail = () => ({
  type: GET_NERBY_DOCTOR_FAILURE,
});
