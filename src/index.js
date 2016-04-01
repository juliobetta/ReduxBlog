import {} from 'babel-polyfill';

import React                            from 'react';
import ReactDOM                         from 'react-dom';
import { Provider }                     from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
// Alternatively, we can use hashHistory or memoryHistory
import { Router, browserHistory }       from 'react-router';
import promise                          from 'redux-promise';
import routes                           from './routes';
import reducers                         from './reducers';
import { EMPTY_NOTIFICATIONS }          from './constants';


const store = applyMiddleware(promise)(createStore)(reducers);


browserHistory.listen(() => store.dispatch({ type: EMPTY_NOTIFICATIONS }));


ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
  , document.getElementById('app'));
