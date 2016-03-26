import React     from 'react';
import Container from './container';


export default (props = {}) => {
  return (
    <nav className="navbar navbar-fixed-top navbar-light bg-faded" {...props}>
      <Container>
        <div className="nav navbar-nav">
          {props.children}
        </div>
      </Container>
    </nav>
  );
};
