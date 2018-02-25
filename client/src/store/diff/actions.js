import {
    UPDATE_DIFF_RESULTS,
    IS_FETCHING
} from './types';

const updateDiffResults = (results) => ({
    type: UPDATE_DIFF_RESULTS,
    payload: results
})

const setDiffFetchStatus = (status) => ({
    type: IS_FETCHING,
    payload: status
})

export const requestDiff = formData => dispatch => {
    dispatch(setDiffFetchStatus(true));
    fetch('/api/diff', {
        body: JSON.stringify(formData),
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(res => {
        dispatch(updateDiffResults(res));
        dispatch(setDiffFetchStatus(false));
    })
    .catch(err => {
        // Temp
        console.log(err)
    })
}