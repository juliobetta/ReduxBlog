import { combineReducers }        from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer }          from 'react-router-redux';
import PostsReducer               from './posts-reducer';
import UsersReducer               from './users-reducer';
import NotificationsReducer       from './notifications-reducer';
import SyncReducer                from './sync-reducer';
import NetworkReducer             from './network-reducer';

const rootReducer = combineReducers({
  routing:       routerReducer,
  form:          formReducer,
  users:         UsersReducer,
  posts:         PostsReducer,
  notifications: NotificationsReducer,
  sync:          SyncReducer,
  network:       NetworkReducer
});


export default rootReducer;
