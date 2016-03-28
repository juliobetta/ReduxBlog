import React         from 'react';
import { connect }   from 'react-redux';
import classNames    from 'classnames';
import PureComponent from './pure-component';
import { ERROR }     from '../constants/alert-status';


class AppNotifications extends PureComponent {

  render() {
    const { messages } = this.props;
    const classes = classNames(['alert', 'alert-dismissible'], {
      [ERROR] : this.props.error
    });

    if(!messages.length) {
      return <span></span>;
    }

    return (
      <div className={classes} role="alert">
        {messages.map((message, i) => <p key={i}>{message}</p>)}
      </div>
    );
  }

}


export default connect(
  (state) => ({
    messages: state.notifications.messages,
    error:    state.notifications.error
  })
)(AppNotifications);
