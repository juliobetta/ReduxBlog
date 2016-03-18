import React, { Component } from 'react';
import { fetchPosts } from '../actions/index';
import { connect } from 'react-redux';
import { Link } from 'react-router';


class PostsIndex extends Component {

  componentWillMount() {
    this.props.fetchPosts();
  }


  render() {
    return (
      <div>
        <div className="text-xs-right">
          <Link to="/posts/new" className="btn btn-primary">
            Add new Post
          </Link>
        </div>
        List of blog posts
      </div>
    );
  }

};


export default connect(null, { fetchPosts })(PostsIndex);
