import React         from 'react';
import { connect }   from 'react-redux';
import PostsItem     from './posts-item';
import PureComponent from '../pure-component';
import Button        from '../elements/button';
import Loading       from '../elements/loading';


class PostsIndex extends PureComponent {

  render() {
    if(!this.props.currentUser) {
      return null;
    }

    if(!this.props.posts) {
      return <Loading />;
    }

    return (
      <div>
        <div className="text-xs-right">
          <Button primary to="/posts/new">Add new Post</Button>
        </div>

        <h3>Posts</h3>

        <ul className="list-group">
          {this.props.posts.map(post => <PostsItem key={post.id} {...post}/>)}
        </ul>
      </div>
    );
  }

};


export default connect(state => ({ posts: state.posts.all }))(PostsIndex);
