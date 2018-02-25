import { 
    UPDATE_DIFF_RESULTS,
    IS_FETCHING,
} from './types';

const initialState = {
    results: null,
    isFetching: null,
    hasError: null
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
                isFetching: action.payload
            }
        default:
            return state;
    }
}

export default reducer;