import { PASSRESET_REQUESTED,PASSCHANGE_REQUESTED, PASSRESET_SUCCESS, PASSRESET_FAIL } from './types';

export const resetPRequest = (data, navigation) => ({
    type: PASSRESET_REQUESTED,
    data,
    navigation,
});
export const changeRequest = (data, navigation) => ({
    type: PASSCHANGE_REQUESTED,
    data,
    navigation,
});

export const apiSuccess = data => (
    {
        type: PASSRESET_SUCCESS,
        data
    }
);
export const apiFail = () => (
    {
        type: PASSRESET_FAIL
    }
);
