import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import PureComponent from '../pure-component';
import FormGroup from '../elements/form-group';
import { ERROR } from '../../constants/alert-status';
import Notification from '../elements/notification';
import Button from '../elements/button';
import formValidator from '../../validators/users-form-validator';
import { registerUser, updateUser,
         cancelUser } from '../../actions/users-actions';
import PasswordField from './users-password-field';


const reduxFormProperties = {
  form: 'UsersForm', // the key should match the reducer name
  fields: ['email', 'name', 'password', 'password_confirmation',
           'current_password'],
  formValidator
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


  renderPasswordFields() {
    const {
      fields: { current_password, password, password_confirmation }
    } = this.props;

    const currentPasswordField = this.props.currentUser
      ? (
        <PasswordField label="Current Password" field={current_password} />
      ) : null;

    return (
      <div>
        {currentPasswordField}
        <PasswordField label="Password" field={password} />
        <PasswordField label="Password Confirmation"
                       field={password_confirmation} />
      </div>
    );
  }


  render() {
    const { handleSubmit } = this.props;
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

          {this.renderPasswordFields()}

          <Button primary type="submit">Submit</Button>
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
