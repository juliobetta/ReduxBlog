import { combineReducers } from 'redux';
import PostsReducer from './posts-reducer';
import AuthReducer from './auth-reducer';
import { reducer as formReducer } from 'redux-form';


const rootReducer = combineReducers({
  auth:  AuthReducer,
  posts: PostsReducer,
  form:  formReducer
});


export default rootReducer;
