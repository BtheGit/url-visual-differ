import { 
    UPDATE_DIFF_RESULTS
} from './types';

const initialState = {
    results: null
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case UPDATE_DIFF_RESULTS:
            return {
                ...state,
                results: action.payload
            }
        default:
            return state;
    }
}

export default reducer;