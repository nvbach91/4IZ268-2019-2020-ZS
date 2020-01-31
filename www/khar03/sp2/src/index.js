import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './App';
import {applyMiddleware, compose, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducers from './reducers';

const store = createStore(
    reducers,
    compose(
        composeWithDevTools(
            applyMiddleware(thunk)
        )
    )
)

ReactDOM.render(
   <Provider store={store}>
        <App />
   </Provider>,
    document.querySelector('#root')
);

