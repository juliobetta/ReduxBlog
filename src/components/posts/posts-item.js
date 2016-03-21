import React from 'react';
import { Link } from 'react-router';


export default (post) => {
  return (
    <li className="list-group-item">
      <span className="pull-xs-right">{post.categories}</span>
      <Link to={`/posts/${post.id}`}>{post.title}</Link>
    </li>
  );
};
