import React, { PropTypes }  from 'react';
import { reduxForm }         from 'redux-form';
import PasswordFields        from './users-passwords-fields';
import PureComponent         from '../pure-component';
import Notification          from '../elements/notification';
import FormGroup             from '../elements/form-group';
import Button                from '../elements/button';
import { ERROR }             from '../../constants/alert-status';
import validate              from '../../validators/users-form-validator';
import { registerUser, updateUser,
          cancelUser } from '../../actions/users-actions';


const reduxFormProperties = {
  form: 'UsersForm', // the key should match the reducer name
  fields: ['email', 'name', 'password', 'password_confirmation',
           'current_password'],
  validate
};


class UsersForm extends PureComponent {

  static contextTypes = {
    router: PropTypes.object
  };


  onSubmitForm(data) {
    let action = null;
    if(this.props.token) {
      action = this.props.updateUser(data);
    } else {
      action = this.props.registerUser(data);
    }

    action.then((response) => {
      if([201, 200].includes(response.payload.status)) {
        this.context.router.push('/');
      }
    });
  }


  onClickCancelAccount(event) {
    event.preventDefault();

    const message = "Are you sure you want to cancel your account?\n" +
                    "All your data and posts will be lost";
    if(confirm(message)) {
      this.props.cancelUser().then((response) => {
        if(!response.error) {
          this.context.router.push('/sign_in');
        }
      });
    }
  }


  render() {
    const { handleSubmit, submitting, invalid } = this.props;
    const { fields: { name, email } } = this.props;

    return (
      <div className="col-xs-6 col-center">
        <Notification messages={this.props.alerts} status={ERROR} />

        <form onSubmit={handleSubmit(this.onSubmitForm.bind(this))}>
          <FormGroup label="Name" field={name}>
            <input type="text" { ...name } className="form-control" />
          </FormGroup>

          <FormGroup label="Email" field={email}>
            <input type="email" { ...email } className="form-control" />
          </FormGroup>

          <PasswordFields {...this.props} />

          <Button primary type="submit" disabled={submitting || invalid}>
            Submit
          </Button>

          <div className="pull-xs-right">
            <Button danger isHidden={this.props.currentUser === undefined}
                           onClick={this.onClickCancelAccount.bind(this)}>
              Cancel account
            </Button>
          </div>
        </form>
      </div>
    );
  }

}


export default reduxForm(
  reduxFormProperties,
  (state) => ({
    initialValues: state.users.currentUser || null,
    alerts: state.users.errors
  }),
  { registerUser, updateUser, cancelUser }
)(UsersForm);
