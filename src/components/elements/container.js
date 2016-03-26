import React from 'react';


export default (props = {}) => {
  return (
    <div className="container" {...props}>
      {props.children}
    </div>
  );
};
