import { combineReducers }        from 'redux';
import { reducer as formReducer } from 'redux-form';
import PostsReducer               from './posts-reducer';
import UsersReducer               from './users-reducer';


const rootReducer = combineReducers({
  users: UsersReducer,
  posts: PostsReducer,
  form:  formReducer
});


export default rootReducer;
