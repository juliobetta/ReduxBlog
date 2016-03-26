import React      from 'react';
import { Link }   from 'react-router';
import classNames from 'classnames';


export default (props = {}) => {
  const { children, path = null, active = false } = props;

  const classes = classNames(['nav-item', 'nav-link'], {
    active: window.location.pathname === props.path,
    hidden: props.isHidden
  });

  if(!path) {
    return (
      <a className={classes} href="#" {...props}>{children}</a>
    );
  }

  return (
    <Link className={classes} to={path}>
      {children}
    </Link>
  );
};
