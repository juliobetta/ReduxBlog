import React from 'react';
import { Link } from 'react-router';


export default (props = {}) => {
  const path = props.path || '/'
  return (
    <Link className="navbar-brand" to={path} {...props}>Redux Blog</Link>
  );
};
