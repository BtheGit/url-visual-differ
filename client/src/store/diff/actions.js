import {
    UPDATE_DIFF_RESULTS
} from './types';

const updateDiffResults = (results) => ({
    type: UPDATE_DIFF_RESULTS,
    payload: results
})

export const requestDiff = formData => dispatch => {
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
}