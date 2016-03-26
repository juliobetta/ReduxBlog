/**
 * Validate posts form values
 * @param  {Object} values
 * @return {Object}
 */
export default function(values) {
  const errors = {};

  if(!values.name) {
    errors.name = 'Enter a Name';
  }

  if(!values.email) {
    errors.email = 'Enter an Email';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if(values.password && values.password_confirmation !== values.password) {
    errors.password_confirmation = 'Confirmation doesn\'t match'
  }

  return errors;
}
