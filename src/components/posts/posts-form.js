import React, { PropTypes } from 'react';
import { reduxForm, reset } from 'redux-form';
import PureComponent from '../pure-component';
import FormGroup from '../elements/form-group';
import FormField from '../elements/form-field';
import Button from '../elements/button';
import { getPost, updatePost, createPost } from '../../actions/posts-actions';
import validate from '../../validators/posts-form-validator';


const reduxFormProperties = {
  form: 'PostsForm', // the key should match the reducer name
  fields: ['title', 'categories', 'content'],
  validate
};


class PostsForm extends PureComponent {

  // Check through all of PostsForm's parents for the property router
  // and assign it to this.context.router
  static contextTypes = {
    router: PropTypes.object
  };


  componentWillMount() {
    if(this.isUpdateForm()) {
      this.props.getPost(this.props.params.id).then((response) => {
        if(response.payload.status !== 200) {
          this.context.router.push('/sign_in');
        }
      });
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

    if(this.isUpdateForm()) {
      action = this.props.updatePost(this.props.params.id, data);
    } else {
      action = this.props.createPost(data);
    }

    action.then(() => this.context.router.push('/') );
  }


  render() {
    const { fields: { title, categories, content }, handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmitForm.bind(this))}>
        <h3>{this.formTitle()}</h3>

        <FormGroup label="Title" field={title}>
          <FormField text {...title} />
        </FormGroup>

        <FormGroup label="Categories" field={categories}>
          <FormField text {...categories} />
        </FormGroup>

        <FormGroup label="Content" field={content}>
          <FormField textarea {...content} />
        </FormGroup>

        <Button primary type="submit" disabled={this.checkFormValid()}>
          Submit
        </Button>

        <Button link to="/">Cancel</Button>
      </form>
    );
  }

}


export default reduxForm(
  reduxFormProperties,
  (state) => ({ initialValues: state.posts.post }),
  { getPost, updatePost, createPost }
)(PostsForm);
