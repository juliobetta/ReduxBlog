import React from 'react';
import { Link } from 'react-router';


export default (props = {}) => {
  return (
    <Link className="navbar-brand" to="/" {...props}>Redux Blog</Link>
  );
};
