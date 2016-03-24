import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';
import PureComponent from '../pure-component';
import FormGroup from '../elements/form-group';
import { ERROR } from '../../constants/alert-status';
import AlertMessage from '../elements/alert-message';
import formValidator from '../../validators/users-form-validator';
import { register, update, cancel, } from '../../actions/users-actions';


const reduxFormProperties = {
  form: 'UsersForm', // the key should match the reducer name
  fields: ['email', 'name', 'password', 'password_confirmation',
           'current_password'],
  formValidator
};


class UsersForm extends PureComponent {

  onSubmitForm(data) {
    console.log(data);
  }


  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmitForm.bind(this))}>
        Registration Form
      </form>
    );
  }

}


export default reduxForm(
  reduxFormProperties,
  (state) => ({}),
  { register, update, cancel }
)(UsersForm);
