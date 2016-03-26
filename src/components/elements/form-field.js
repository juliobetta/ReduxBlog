import React from 'react';
import classNames from 'classnames';


export default (props = {}) => {
  const classes = classNames(["form-control"]);

  if(props.textarea) {
    return (
      <textarea {...props} className={classes} />
    );
  }

  if(props.select) {
    return (
      <select {...props} className={classes}>
        {props.children}
      </select>
    );
  }

  const availableTypes = [ 'text', 'password', 'email', 'number' ];
  const type = Object.keys(props).filter((k) => {
    return availableTypes.includes(k);
  })[0];

  return (
    <input className={classes} type={type} {...props} />
  );
};
