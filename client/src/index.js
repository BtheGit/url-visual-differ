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

const savedState = loadStateFromSessionStorage();
const store = createStore(
    combineReducers({
        diff,
        form: reduxFormReducer,
        router: routerReducer
    }),
    savedState,
    composeWithDevTools(
        applyMiddleware(thunk, historyMiddleware)
    )
)
const backupStateToSessionStorage = () => {
    saveStatetoSessionStorage(store.getState())
}
store.subscribe(backupStateToSessionStorage);

const AppTree = () => (
    <Provider store={ store }>
        <ConnectedRouter history={ history }>
            <App />
        </ConnectedRouter>
    </Provider>
)

ReactDOM.render(<AppTree />, document.getElementById('root'));
