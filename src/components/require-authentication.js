import React         from 'react';
import PureComponent from './pure-component';
import { connect }   from 'react-redux';
import { getUser }   from '../actions/users-actions';


export default function(ComposedComponent) {
  class RequireAuthentication extends PureComponent {
    static contextTypes = {
      router: React.PropTypes.object
    }


    goToSignIn() {
      this.context.router.push('/sign_in');
    }


    componentWillMount() {
      this.props.getUser().then((response) => {
        if(response.error) {
          this.goToSignIn();
        }
      });
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
    (state) => ({
      token: state.users.token,
      currentUser: state.users.currentUser
    }),
    { getUser }
  )(RequireAuthentication);
}
