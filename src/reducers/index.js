import { combineReducers } from 'redux';
import PostsReducer from './posts-reducer';
import UsersReducer from './users-reducer';
import { reducer as formReducer } from 'redux-form';


const rootReducer = combineReducers({
  users: UsersReducer,
  posts: PostsReducer,
  form:  formReducer
});


export default rootReducer;
