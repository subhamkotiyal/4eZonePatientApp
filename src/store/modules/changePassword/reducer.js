import { PASSRESET_REQUESTED, PASSCHANGE_REQUESTED, PASSRESET_SUCCESS, PASSRESET_FAIL } from './types';

const INITIAL_STATE = {
    data: null,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PASSRESET_REQUESTED:
            return {
                ...state,
            };
        case PASSCHANGE_REQUESTED:
            return {
                ...state,
            };
        case PASSRESET_SUCCESS:
            return {
                ...state,
                data: action.data
            };
        case PASSRESET_FAIL:
            return {
                ...state,
            };
        default:
            return state;
    }
};
