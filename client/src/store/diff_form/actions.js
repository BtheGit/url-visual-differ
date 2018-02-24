import {
    UPDATE_REQUEST_VALUE
} from './types';

export const updateRequestValue = (value) => ({
    type: UPDATE_REQUEST_VALUE,
    payload: value
})