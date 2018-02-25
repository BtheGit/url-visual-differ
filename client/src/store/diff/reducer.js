import { 
    UPDATE_DIFF_RESULTS,
    IS_FETCHING,
    HAS_ERROR,
} from './types';

const initialState = {
    results: null,
    isFetching: false,
    hasError: false,
    error: null
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case UPDATE_DIFF_RESULTS:
            return {
                ...state,
                results: action.payload
            }
        case IS_FETCHING:
            return {
                ...state,
                isFetching: action.status
            }
        case HAS_ERROR:
            return {
                ...state,
                hasError: action.status,
                error: action.error
            }
        default:
            return state;
    }
}

export default reducer;