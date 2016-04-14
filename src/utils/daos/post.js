import * as Database                       from '../local-api';
import { POSTS_RESOURCE, orderDirections } from '../database-schema';


class Post {
  static index() {
    return Database.fetchAll({
      resource: POSTS_RESOURCE,
      params: { deleted_at: null },
      options: {
        orderBy: [
          ['created_at', orderDirections.DESC]
        ]
      }
    });
  }


  static fetchAll(params) {
    return Database.fetchAll({ resource: POSTS_RESOURCE, params });
  }


  static fetchOne(id) {
    return Database.fetchOne({ resource: POSTS_RESOURCE, params: { id }});
  }


  static create(data) {
    return Database.create({ resource: POSTS_RESOURCE, data });
  }


  static delete(id) {
    return Post.fetchOne(id).then((post) => {
      if(post.remote_id) {
        // will be destroyed when synchonization with server is finished
        return Database.softDelete({ resource: POSTS_RESOURCE, params: { id }});
      }

      return Database.destroy({ resource: POSTS_RESOURCE, params: { id }});
    });
  }


  static update(id, data) {
    return Database.update({ resource: POSTS_RESOURCE, params: { id }, data });
  }
}

export default Post;
