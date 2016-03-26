import React       from 'react';
import classNames  from 'classnames';
import * as Status from '../../constants/alert-status';


export default ({ messages, status = Status.INFO }) => {
  const classes = classNames(['alert', 'alert-dismissible', status]);

  if(!messages.length) {
    return <span></span>;
  }

  return (
    <div className={classes} role="alert">
      {messages.map((message, i) => <p key={i}>{message}</p>)}
    </div>
  );
}
