import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import PostsIndex from './components/posts/posts-index';
import PostsForm from './components/posts/posts-form';
import PostsShow from './components/posts/posts-show';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={PostsIndex} />
    <Route path="posts/new" component={PostsForm} />
    <Route path="posts/edit/:id" component={PostsForm} />
    <Route path="posts/:id" component={PostsShow} />
  </Route>
);
