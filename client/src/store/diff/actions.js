import {
    UPDATE_DIFF_RESULTS
} from './types';

export const updateDiffResults = (results) => ({
    type: UPDATE_DIFF_RESULTS,
    payload: results
})