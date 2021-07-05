import * as types from './types'

/*eslint-disable */
const defaultState = {
    language: {code:'en',name:'English'}
};
const switchLanguageVal = (state = defaultState, action) => {
    switch (action.type) {
        case types.SWITCH_LANGUAGE_DATA: {
         const language = {
                ...state,
                language:action.payload
            };
            return language
        }
        case types.LANGUAGE_FAIL:
          return {
            ...state,
          };
        default:
            return state;
    }
}

export default switchLanguageVal;
