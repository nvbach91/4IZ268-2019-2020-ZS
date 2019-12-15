import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import { App } from './components/App';
import reducers from './reducers';
import {composeWithDevTools} from "redux-devtools-extension";

const store = createStore(
  reducers,
  compose(
    composeWithDevTools(
      applyMiddleware(
        thunk,
      )
    )
  )
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
