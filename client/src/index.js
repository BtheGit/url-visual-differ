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
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const history = createHistory();
const historyMiddleware = routerMiddleware(history);

const store = createStore(
    combineReducers({
        diff,
        form: reduxFormReducer,
        router: routerReducer
    }),
    composeWithDevTools(
        applyMiddleware(thunk, historyMiddleware)
    )
)

const AppTree = () => (
    <Provider store={ store }>
        <ConnectedRouter history={ history }>
            <App />
        </ConnectedRouter>
    </Provider>
)

ReactDOM.render(<AppTree />, document.getElementById('root'));
registerServiceWorker();
