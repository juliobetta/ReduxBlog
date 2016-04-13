import Lovefield from 'lovefield';

export const conditions      = Lovefield.op;
export const orderDirections = Lovefield.Order;

export const POSTS_RESOURCE = 'posts';
export const USERS_RESOURCE = 'users';
export const DB_NAME        = 'redux-blog';
export const DB_VERSION     = 5;

const isIos   = () => navigator.userAgent.match(/(iPad|iPhone|iPod)/g);
const builder = Lovefield.schema.create(DB_NAME, DB_VERSION);

builder.createTable(USERS_RESOURCE)
       .addColumn('current_user',  Lovefield.Type.OBJECT);


builder.createTable(POSTS_RESOURCE)
  .addColumn('id',         Lovefield.Type.STRING)
  .addColumn('created_at', Lovefield.Type.NUMBER)
  .addColumn('updated_at', Lovefield.Type.NUMBER)
  .addColumn('deleted_at', Lovefield.Type.NUMBER)
  .addColumn('remote_id',  Lovefield.Type.NUMBER)
  .addColumn('title',      Lovefield.Type.STRING)
  .addColumn('categories', Lovefield.Type.STRING)
  .addColumn('content',    Lovefield.Type.STRING)
  .addNullable(['remote_id', 'deleted_at'])
  .addUnique('idxRemoteId', ['remote_id'])
  .addIndex('idxCreatedAt', ['created_at'])
  .addIndex('idxUpdatedAt', ['updated_at'])
  .addIndex('idxDeletedAt', ['deleted_at'])
  .addPrimaryKey(['id']);


let options = {
  onUpgrade: function(db) {
    return db.addTableColumn(POSTS_RESOURCE, 'deleted_at', null);
  }
};


if(isIos()) {
  options.storeType = Lovefield.schema.DataStoreType.WEB_SQL;
}

export const schema = builder.connect(options);
