import React      from 'react';
import classNames from 'classnames';


export const DEFAULT = 'default';
export const PRIMARY = 'primary';
export const SUCCESS = 'success';
export const INFO    = 'info';
export const WARNING = 'warning';
export const DANGER  = 'danger';

export default (props = {}) => {
  const availableStatus = [
    DEFAULT, PRIMARY, SUCCESS, INFO, WARNING, DANGER
  ];

  const status = Object.keys(props).filter((k) => {
    return availableStatus.includes(k);
  })[0];

  const classes = classNames(['label'], {
    [`label-${status || DEFAULT}`]: true
  });

  return (
    <span className={classes}>{props.children}</span>
  );
};
