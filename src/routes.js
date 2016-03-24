import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import RequireAuth from './components/require-authentication';
import PostsIndex from './components/posts/posts-index';
import PostsForm from './components/posts/posts-form';
import PostsShow from './components/posts/posts-show';
import AuthForm from './components/auth/auth-form';
import UsersForm from './components/users/users-form';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={PostsIndex} />
    <Route path="sign_in" component={AuthForm} />
    <Route path="users/new" component={UsersForm} />
    <Route path="users/edit" component={RequireAuth(UsersForm)} />
    <Route path="posts/new" component={RequireAuth(PostsForm)} />
    <Route path="posts/edit/:id" component={RequireAuth(PostsForm)} />
    <Route path="posts/:id" component={PostsShow} />
  </Route>
);
