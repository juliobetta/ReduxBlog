import React       from 'react';
import * as Status from '../../constants/alert-status';


export default ({ messages, status = Status.INFO }) => {
  const classNames = ['alert', 'alert-dismissible', status];

  if(!messages.length) {
    return <span></span>;
  }

  return (
    <div className={classNames.join(' ')} role="alert">
      {messages.map((message, i) => <p key={i}>{message}</p>)}
    </div>
  );
}
