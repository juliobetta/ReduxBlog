/**
 * Validate posts form values
 * @param  {Object} values
 * @return {Object}
 */
export default (values) => {
  const errors = {};

  if(!values.title) {
    errors.title = 'Enter a title';
  }

  if(!values.categories) {
    errors.categories = 'Enter at least one category';
  }

  if(!values.content) {
    errors.content = 'Enter a content';
  }

  return errors;
};
