import React, { PropTypes } from 'react';
import { connect }          from 'react-redux';
import PureComponent        from './pure-component';
import NavBar               from './elements/navbar';
import NavBarBrand          from './elements/navbar-brand';
import NavBarItem           from './elements/navbar-item';
import { signout }          from '../actions/users-actions';


class AppNavBar extends PureComponent {

  static contextTypes = {
    router: PropTypes.object
  };


  onClickSignOut(event) {
    event.preventDefault();

    this.props.signout();
    this.context.router.push('/sign_in');
  }


  renderSignout() {
    if(!this.props.currentUser) {
      return null;
    }

    return (
      <NavBarItem onClick={this.onClickSignOut.bind(this)}>Exit</NavBarItem>
    );
  }


  renderEmail() {
    if(!this.props.currentUser) {
      return null;
    }

    return (
      <NavBarItem path="/users/edit">{this.props.currentUser.email}</NavBarItem>
    );
  }


  render() {
    const rootUrl = this.props.currentUser ? "/" : "/sign_in";

    return (
      <NavBar>
        <NavBarBrand path={rootUrl}/>
        <NavBarItem isHidden={this.props.currentUser === null} path="/">
          Posts
        </NavBarItem>
        <div className="pull-xs-right">
          {this.renderEmail()}
          {this.renderSignout()}
        </div>
      </NavBar>
    );
  }
}


export default connect(
  (state) => ({
    currentUser: state.users.currentUser
  }),
  { signout }
)(AppNavBar);
