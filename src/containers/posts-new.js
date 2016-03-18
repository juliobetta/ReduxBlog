import React, { Component } from 'react';
// very similar to 'connect' from react-redux. It is responsible to map
// the global state to props
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router';


class PostsNew extends Component {

  checkValid(field) {
    return field.touched && field.invalid ? 'has-danger' : '';
  }


  checkError(field) {
    return field.touched ? field.error : '';
  }


  checkFormValid() {
    return `${this.props.invalid ? 'disabled' : ''}`;
  }


  render() {
    const { fields: { title, categories, content }, handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.props.createPost)}>
        <h3>Create a new Post</h3>
        <div className={`form-group ${this.checkValid(title)}`}>
          <label>Title</label>
          <input type="text" className="form-control" {...title} />
          <div className="text-help">{this.checkError(title)}</div>
        </div>

        <div className={`form-group ${this.checkValid(categories)}`}>
          <label>Categories</label>
          <input type="text" className="form-control" {...categories} />
          <div className="text-help">{this.checkError(categories)}</div>
        </div>

        <div className={`form-group ${this.checkValid(content)}`}>
          <label>Content</label>
          <textarea className="form-control" {...content} />
          <div className="text-help">{this.checkError(content)}</div>
        </div>

        <button type="submit"
                className="btn btn-primary"
                disabled={this.checkFormValid()}>Submit</button>

        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }

}


function validate(values) {
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
}


// connect: 1st argument is mapStateToProps, 2nd is mapDispatchToProps
// reduxForm: 1st is form config, 2nd is mapStateToProps,
// 3rd is mapDispatchToProps
export default reduxForm({
  form: 'PostsNewForm', // the key should match the reducer name
  fields: ['title', 'categories', 'content'],
  validate
}, null, { createPost })(PostsNew);
