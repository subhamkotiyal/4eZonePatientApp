import { RESET_SUCCESS, CLEAR_OTP_SUCCESS,CLEAR_OTP_REQUEST,REQUEST_RESET, RESET_FAIL } from './types';

export const resetRequest = (countryCode, mobileNumber) => ({
    type: REQUEST_RESET,
    countryCode,
    mobileNumber,
    
});

export const resetSuccess = data => (
    {
        type: RESET_SUCCESS,
        data
    }
);
export const resetFail = () => (
    {
        type: RESET_FAIL
    }
);


export const clearOTPRequest = () => ({
    type: CLEAR_OTP_REQUEST,
    
});

export const clearOTPSuccess = () =>({
    type: CLEAR_OTP_SUCCESS,

})