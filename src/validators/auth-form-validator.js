/**
 * Validate posts form values
 * @param  {Object} values
 * @return {Object}
 */
export default function(values) {
  const errors = {};

  if(!values.email) {
    errors.email = 'Enter your email';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }


  if(!values.password) {
    errors.password = 'Enter your password';
  }

  return errors;
}
