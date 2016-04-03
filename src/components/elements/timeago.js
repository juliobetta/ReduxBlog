import React from 'react';
import moment from 'moment';


export default ({ timestamp }) => {
  return (
    <span>{moment(timestamp).calendar()}</span>
  );
};
