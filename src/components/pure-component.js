import React, { Component } from 'react';
import shallowEqual from 'react-pure-render/shallowEqual';


// https://www.toptal.com/react/react-redux-and-immutablejs

export default class PureComponent extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) ||
           !shallowEqual(this.state, nextState);
  }

}
