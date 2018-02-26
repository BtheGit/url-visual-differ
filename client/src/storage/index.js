// Returning undefined ensures Redux will load from initialState if sessionStorage isn't available
export const loadStateFromSessionStorage = () => {
    try {
        const serializedState = sessionStorage.getItem('diffAppStore');
        if(serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    }
    catch(err) {
        return undefined;
    }
}

export const saveStatetoSessionStorage = state => {
    try {
        const serializedState = JSON.stringify(state);
        sessionStorage.setItem('diffAppStore', serializedState)
    }
    catch(err) {
        // Handle Errors
    }
}