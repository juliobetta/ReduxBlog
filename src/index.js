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
import { checkIsOnline }                from './utils';
import asyncMiddleware                  from './middlewares/async';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';


const router = routerMiddleware(hashHistory);
const store  = applyMiddleware(router, asyncMiddleware, promise)
                              (createStore)
                              (reducers);


// Alternatively, we can use browserHistory or memoryHistory
hashHistory.listen(() => store.dispatch({ type: EMPTY_NOTIFICATIONS }));

// Create an enhanced history that syncs navigation events with the store
const enhancedHistory = syncHistoryWithStore(hashHistory, store);


ReactDOM.render(
  <Provider store={store}>
    <Router history={enhancedHistory} routes={routes} />
  </Provider>
  , document.getElementById('app')
);
