import { 
    EXECUTE_SMOKE_TEST,
} from './types';

const initialState = {
    isFetching: false,
    hasError: false,
    results: null
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        default:
            return state;
    }
}

export default reducer;