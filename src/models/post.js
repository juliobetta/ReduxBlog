import * as Database                       from '../utils/local-api';
import { POSTS_RESOURCE, orderDirections } from '../utils/database-schema';


const Post = {
  index: () => {
    return Database.fetchAll({
      resource: POSTS_RESOURCE,
      params: { deleted_at: null },
      options: {
        orderBy: [
          ['created_at', orderDirections.DESC]
        ]
      }
    });
  },


  fetchAll: (params) => {
    return Database.fetchAll({ resource: POSTS_RESOURCE, params });
  },


  fetchOne: (id) => {
    return Database.fetchOne({ resource: POSTS_RESOURCE, params: { id }});
  },


  create: (data) => {
    return Database.create({ resource: POSTS_RESOURCE, data });
  },


  delete: (id) => {
    return Database.softDelete({ resource: POSTS_RESOURCE, params: { id }});
  },


  update: (id, data) => {
    return Database.update({ resource: POSTS_RESOURCE, params: { id }, data });
  }
};

export default Post;
