import React from 'react';
import PureComponent from './pure-component';
import { connect } from 'react-redux';
import { getSavedToken } from '../actions/users-actions';


export default function(ComposedComponent) {
  class RequireAuthentication extends PureComponent {
    static contextTypes = {
      router: React.PropTypes.object
    }


    goToSignIn() {
      this.context.router.push('/sign_in');
    }


    componentWillMount() {
      const token = this.props.getSavedToken().payload.token;

      if(!token) {
        this.goToSignIn();
      }
    }


    componentWillUpdate(nextProps) {
      if(!nextProps.token) {
        this.goToSignIn();
      }
    }


    render() {
      return (<ComposedComponent {...this.props} />);
    }
  }


  return connect(
    (state) => ({ token: state.users.token }),
    { getSavedToken }
  )(RequireAuthentication);
}
