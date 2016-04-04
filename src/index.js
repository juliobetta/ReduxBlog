import {} from 'babel-polyfill';

import React                            from 'react';
import ReactDOM                         from 'react-dom';
import { Provider }                     from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, hashHistory }          from 'react-router';
import promise                          from 'redux-promise';
import routes                           from './routes';
import reducers                         from './reducers';
import { EMPTY_NOTIFICATIONS }          from './constants';

const store = applyMiddleware(promise)(createStore)(reducers);


// Alternatively, we can use browserHistory or memoryHistory
hashHistory.listen(() => store.dispatch({ type: EMPTY_NOTIFICATIONS }));


ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory} routes={routes} />
  </Provider>
  , document.getElementById('app')
);
