import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';
import PureComponent from '../pure-component';
import FormGroup from '../elements/form-group';
import { ERROR } from '../../constants/alert-status';
import AlertMessage from '../elements/alert-message';
import formValidator from '../../validators/auth-form-validator';
import { signin } from '../../actions/users-actions';


const reduxFormProperties = {
  form: 'UsersAuthForm', // the key should match the reducer name
  fields: ['email', 'password'],
  formValidator
};


class UsersAuthForm extends PureComponent {

  static contextTypes = {
    router: PropTypes.object
  };


  onSubmitForm(props) {
    this.props.signin(props).then((response) => {
      if(response.payload.status === 200) {
        this.context.router.push('/');
      }
    });
  }


  render() {
    const { fields: { email, password }, handleSubmit } = this.props;

    return (
      <div className="col-xs-6 col-center">
        <AlertMessage messages={this.props.alerts} status={ERROR} />

        <form onSubmit={handleSubmit(this.onSubmitForm.bind(this))}>
          <FormGroup label="Email" field={email}>
            <input type="email" className="form-control" {...email} />
          </FormGroup>

          <FormGroup label="Password" field={password}>
            <input type="password" className="form-control" {...password} />
          </FormGroup>

          <button type="submit" className="btn btn-primary">Sign in</button>
          <Link to="/" className="btn btn-danger">Cancel</Link>
        </form>
      </div>
    );
  }

}


export default reduxForm(
  reduxFormProperties,
  (state) => ({ alerts: state.users.errors }),
  { signin }
)(UsersAuthForm);
