import React, { PropTypes } from 'react';
import { connect }          from 'react-redux';
import PureComponent        from '../pure-component';
import Button               from '../elements/button';
import Loading              from '../elements/loading';
import { getPost, emptyPost,
         deletePost } from '../../actions/posts-actions';


class PostsForm extends PureComponent {

  // Check through all of PostsNew's parents for the property router
  // and assign it to this.context.router
  static contextTypes = {
    router: PropTypes.object
  };


  componentWillMount() {
    this.props.emptyPost();
    this.props.getPost(this.props.params.id).then((response) => {
      if(response.payload.status !== 200) {
        this.context.router.push('/sign_in');
      }
    });
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
      return (<Loading />);
    }

    const {id, title, categories, content} = this.props.post;

    return (
      <div>
        <div className="text-xs-right">
          <Button primary to={`/posts/edit/${id}`}>Edit Post</Button>
          <Button danger onClick={this.onClickDelete.bind(this)}>
            Delete Post
          </Button>
        </div>

        <h3>{title}</h3>
        <h6>{categories}</h6>
        <p>{content}</p>
      </div>
    );
  }

}


export default connect(
  (state) => ({ post: state.posts.post }),
  { getPost, deletePost, emptyPost }
)(PostsForm);
