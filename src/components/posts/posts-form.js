import React, { PropTypes } from 'react';
// very similar to 'connect' from react-redux. It is responsible to map
// the global state to props
import { reduxForm, reset } from 'redux-form';
import { Link } from 'react-router';
import PureComponent from '../pure-component';
import FormGroup from '../elements/form-group';
import { getPost, updatePost, createPost } from '../../actions/posts-actions';
import formValidator from '../../validators/posts-form-validator';


const reduxFormProperties = {
  form: 'PostsForm', // the key should match the reducer name
  fields: ['title', 'categories', 'content'],
  formValidator
};


class PostsForm extends PureComponent {

  // Check through all of PostsForm's parents for the property router
  // and assign it to this.context.router
  static contextTypes = {
    router: PropTypes.object
  };


  componentWillMount() {
    if(this.isUpdateForm()) {
      this.props.getPost(this.props.params.id);
    }
  }


  isUpdateForm() {
    return this.props.params.id !== undefined;
  }


  formTitle() {
    return `${this.isUpdateForm() ? 'Update' : 'Create'} Post`;
  }


  checkFormValid() {
    return `${this.props.invalid ? 'disabled' : ''}`;
  }


  onSubmitForm(data) {
    let action = null;

    const { currentUser: { token } } = this.props;

    if(this.isUpdateForm()) {
      action = this.props.updatePost(this.props.params.id, data, token);
    } else {
      action = this.props.createPost(data, token);
    }

    action.then(() => this.context.router.push('/') );
  }


  render() {
    const { fields: { title, categories, content }, handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmitForm.bind(this))}>
        <h3>{this.formTitle()}</h3>

        <FormGroup label="Title" field={title}>
          <input type="text" className="form-control" {...title} />
        </FormGroup>

        <FormGroup label="Categories" field={categories}>
          <input type="text" className="form-control" {...categories} />
        </FormGroup>

        <FormGroup label="Content" field={content}>
          <textarea className="form-control" {...content} />
        </FormGroup>

        <button type="submit"
                className="btn btn-primary"
                disabled={this.checkFormValid()}>Submit</button>

        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }

}


// #############################################################################
// MIXINS ######################################################################
// #############################################################################

  function mapStateToProps(state) {
    return {
      initialValues: state.posts.post,
      currentUser: state.auth.currentUser
    };
  }

// #############################################################################
// #############################################################################


// connect: 1st argument is mapStateToProps, 2nd is mapDispatchToProps
// reduxForm: 1st is form config, 2nd is mapStateToProps,
// 3rd is mapDispatchToProps
export default reduxForm(
  reduxFormProperties, mapStateToProps,
  { getPost, updatePost, createPost }
)(PostsForm);
