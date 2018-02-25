import {
    UPDATE_DIFF_RESULTS,
    IS_FETCHING,
    HAS_ERROR
} from './types';

const updateDiffResults = results => ({
    type: UPDATE_DIFF_RESULTS,
    payload: results
})

const setDiffFetchStatus = status => ({
    type: IS_FETCHING,
    status
})

const setDiffErrorStatus = (status, error = null) => ({
    type: HAS_ERROR,
    status,
    error
})

export const requestDiff = formData => dispatch => {
    dispatch(setDiffErrorStatus(false));
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
    })
    .catch(err => {
        dispatch(setDiffErrorStatus(true, err))
    })
    .finally(() => {
        dispatch(setDiffFetchStatus(false));
    })
}