import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {Link } from 'react-router';
import { getPost, deletePost } from '../actions/index';

class PostsShow extends Component {

  // Check through all of PostsNew's parents for the property router
  // and assign it to this.context.router
  static contextTypes = {
    router: PropTypes.object
  };


  componentWillMount() {
    this.props.getPost(this.props.params.id);
  }


  onClickDelete(event) {
    event.preventDefault();

    if(confirm('Are you sure?')) {
      this.props.deletePost(this.props.params.id)
        .then(() => this.context.router.push('/') );
    }
  }


  render() {
    if(!this.props.post) {
      return (<div>Loading...</div>);
    }

    const {title, categories, content} = this.props.post;

    return (
      <div>
        <div className="text-xs-right">
          <button className="btn btn-danger"
                  onClick={this.onClickDelete.bind(this)}>
            Delete Post
          </button>
        </div>
        <Link to="/">Back to Posts</Link>
        <h3>{title}</h3>
        <h6>{categories}</h6>
        <p>{content}</p>
      </div>
    );
  }

}


function mapStateToProps(state) {
  return {
    post: state.posts.post
  };
}


export default connect(mapStateToProps, { getPost, deletePost })(PostsShow);
