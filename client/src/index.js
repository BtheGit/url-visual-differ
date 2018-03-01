import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import diff from './store/diff/reducer'
import { reducer as reduxFormReducer } from 'redux-form';
import { composeWithDevTools } from 'redux-devtools-extension';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'
import { createBrowserHistory as createHistory } from 'history';
import { loadStateFromSessionStorage, saveStatetoSessionStorage } from './storage';
import './index.css';

import App from './App';

const history = createHistory();
const historyMiddleware = routerMiddleware(history);
const savedFormState = loadStateFromSessionStorage();

const store = createStore(
    combineReducers({
        diff,
        form: reduxFormReducer,
        router: routerReducer
    }),
    savedFormState,
    composeWithDevTools(
        applyMiddleware(thunk, historyMiddleware)
    )
)

const saveFormStateToSessionStorage = () => {
    const state = store.getState();
    const filteredState = {
        form: {...state.form}
    }
    saveStatetoSessionStorage(filteredState);
}

// This will only work when the number of images is lower since session storage
// maxes out at 10MB.
const saveAllStateToSessionStorage = store => {
    const state = store.getState();
    console.log(state)
    saveStatetoSessionStorage(state);
}

const windowUnloadHandler = () => {
    saveAllStateToSessionStorage(store);
    window.removeEventListener('beforeunload', windowUnloadHandler);
}

store.subscribe(saveFormStateToSessionStorage);

class AppTree extends React.Component {
    componentDidMount() {
        window.addEventListener('beforeunload', windowUnloadHandler);
    }

    render() {
        return (
            <Provider store={ store }>
                <ConnectedRouter history={ history }>
                    <App />
                </ConnectedRouter>
            </Provider>
        )
    }
} 

ReactDOM.render(<AppTree />, document.getElementById('root'));
