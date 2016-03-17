import React, { Component } from 'react';
import { fetchPosts } from '../actions/index';
import { connect } from 'react-redux';


class PostsIndex extends Component {

  componentWillMount() {
    this.props.fetchPosts();
  }


  render() {
    return (
      <div>List of blog posts</div>
    );
  }

};


export default connect(null, { fetchPosts })(PostsIndex);
