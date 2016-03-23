import React from 'react';
import PureComponent from './pure-component';
import { connect } from 'react-redux';


export default function(ComposedComponent) {
  class RequireAuthentication extends PureComponent {
    static contextTypes = {
      router: React.PropTypes.object
    }


    componentWillMount() {
      if(!this.props.isSignedIn) {
        this.context.router.push('/');
      }
    }


    componentWillUpdate(nextProps) {
      if(!nextProps.isSignedIn) {
        this.context.router.push('/');
      }
    }


    render() {
      return (<ComposedComponent {...this.props} />);
    }
  }


  return connect(
    (state) => ({ isSignedIn: state.auth.isSignedIn })
  )(RequireAuthentication);
}
