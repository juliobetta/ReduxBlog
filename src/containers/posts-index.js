import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import PureComponent from '../components/pure-component';
import { fetchPosts, emptyPost } from '../actions/index';
import Loading from '../components/loading';


class PostsIndex extends PureComponent {

  componentWillMount() {
    this.props.emptyPost();
    this.props.fetchPosts();
  }


  renderPosts() {
    return this.props.posts.map((post) => {
      return (
        <li key={post.id} className="list-group-item">
          <span className="pull-xs-right">{post.categories}</span>
          <Link to={`/posts/${post.id}`}>{post.title}</Link>
        </li>
      );
    });
  }


  render() {
    if(!this.props.posts) {
      return <Loading />;
    }

    return (
      <div>
        <div className="text-xs-right">
          <Link to="/posts/new" className="btn btn-primary">
            Add new Post
          </Link>
        </div>

        <h3>Posts</h3>

        <ul className="list-group">{this.renderPosts()}</ul>
      </div>
    );
  }

};


export default connect(
  (state) => { return { posts: state.posts.all }; },
  { fetchPosts, emptyPost }
)(PostsIndex);
