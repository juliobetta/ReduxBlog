import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import PostsItem from './posts-item';
import PureComponent from '../pure-component';
import Loading from '../elements/loading';
import { fetchPosts, emptyPost } from '../../actions/posts-actions';


class PostsIndex extends PureComponent {

  componentWillMount() {
    this.props.emptyPost();
    if(this.props.token) {
      this.props.fetchPosts(this.props.token);
    }
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

          <Link to="/users/edit" className="btn btn-secondary">
            Edit User
          </Link>
        </div>

        <h3>Posts</h3>

        <ul className="list-group">
          {this.props.posts.map(post => <PostsItem key={post.id} {...post}/>)}
        </ul>
      </div>
    );
  }

};


export default connect(
  state => ({ posts: state.posts.all }),
  { fetchPosts, emptyPost }
)(PostsIndex);
