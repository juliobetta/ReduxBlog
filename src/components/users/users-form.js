import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';
import PureComponent from '../pure-component';
import FormGroup from '../elements/form-group';
import { ERROR } from '../../constants/alert-status';
import AlertMessage from '../elements/alert-message';
import formValidator from '../../validators/users-form-validator';
import { registerUser, getUser,
         updateUser, cancelUser } from '../../actions/users-actions';
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


  componentWillMount() {
    if(this.props.token && !this.props.initialValues) {
      this.props.getUser();
    }
  }

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

    const currentPasswordField = this.props.token
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
        <AlertMessage messages={this.props.alerts} status={ERROR} />

        <form onSubmit={handleSubmit(this.onSubmitForm.bind(this))}>
          <FormGroup label="Name" field={name}>
            <input type="text" { ...name } className="form-control" />
          </FormGroup>

          <FormGroup label="Email" field={email}>
            <input type="email" { ...email } className="form-control" />
          </FormGroup>

          {this.renderPasswordFields()}

          <button type="submit" className="btn btn-primary">Submit</button>
          <Link to="/" className="btn btn-danger">Cancel</Link>
        </form>
      </div>
    );
  }

}


export default reduxForm(
  reduxFormProperties,
  (state) => ({
    initialValues: state.users.currentUser || {},
    token: state.users.token,
    alerts: state.users.errors
  }),
  { registerUser, getUser, updateUser, cancelUser }
)(UsersForm);
