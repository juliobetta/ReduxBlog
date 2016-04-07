import { combineReducers }        from 'redux';
import { reducer as formReducer } from 'redux-form';
import PostsReducer               from './posts-reducer';
import UsersReducer               from './users-reducer';
import NotificationsReducer       from './notifications-reducer';
import SyncReducer                from './sync-reducer';

const rootReducer = combineReducers({
  users:         UsersReducer,
  posts:         PostsReducer,
  notifications: NotificationsReducer,
  sync:          SyncReducer,
  form:          formReducer
});


export default rootReducer;
