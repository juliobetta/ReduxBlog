import React, { PropTypes } from 'react';
// very similar to 'connect' from react-redux. It is responsible to map
// the global state to props
import { reduxForm, reset } from 'redux-form';
import { Link } from 'react-router';
import PureComponent from '../components/pure-component';
import { getPost, updatePost, createPost } from '../actions/index';
import formValidator from '../validators/posts-form-validator';
import FormGroup from '../components/form-group';


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


  onSubmitForm(props) {
    let action = null;

    if(this.isUpdateForm()) {
      action = this.props.updatePost(this.props.params.id, props);
    } else {
      action = this.props.createPost(props);
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
    return { initialValues: state.posts.post };
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
