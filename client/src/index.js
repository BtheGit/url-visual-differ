import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { reducer as reduxFormReducer } from 'redux-form';
import { composeWithDevTools } from 'redux-devtools-extension';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(
    combineReducers({
        form: reduxFormReducer
    }),
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

const AppTree = () => (
    <Provider store={store}>
        <App />
    </Provider>
)

ReactDOM.render(<AppTree />, document.getElementById('root'));
registerServiceWorker();
