import { 
    UPDATE_REQUEST_VALUE
} from './types';

const initialState = {
    requestValue: null
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case UPDATE_REQUEST_VALUE:
            return {
                ...state,
                requestValue: {
                    ...state.requestValue,
                    ...action.payload
                }
            }
        default:
            return state;
    }
}

export default reducer;