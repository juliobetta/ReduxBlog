import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router';


export default (props = {}) => {
  const availableTypes = [ 'primary', 'secondary', 'success', 'info',
                           'danger', 'warning', 'link' ];

  const buttonClasses = Object.keys(props).filter((k) => {
    return availableTypes.includes(k);
  }).map((type) => `btn-${type}`);

  const classes = classNames(['btn', ...buttonClasses]);

  if(props.to) {
    return (
      <Link {...props} className={classes}>
        {props.children}
      </Link>
    );
  }

  return (
    <button {...props} className={classes}>
      {props.children}
    </button>
  );
};
