import Lovefield from 'lovefield';

export const conditions = Lovefield.op;

export const POSTS_RESOURCE   = 'posts';
export const USERS_RESOURCE   = 'users';
export const CHANGES_RESOURCE = 'changes';
export const SYNC_RESOURCE    = 'sync';
export const DB_NAME          = 'redux-blog';
export const DB_VERSION       = 1;


const isIos   = () => navigator.userAgent.match(/(iPad|iPhone|iPod)/g);
const builder = Lovefield.schema.create(DB_NAME, DB_VERSION);

builder.createTable(USERS_RESOURCE)
       .addColumn('current_user',  Lovefield.Type.OBJECT);


 builder.createTable(SYNC_RESOURCE)
        .addColumn('updated_at',  Lovefield.Type.NUMBER);


builder.createTable(POSTS_RESOURCE)
  .addColumn('id',         Lovefield.Type.STRING)
  .addColumn('created_at', Lovefield.Type.NUMBER)
  .addColumn('updated_at', Lovefield.Type.NUMBER)
  .addColumn('remote_id',  Lovefield.Type.NUMBER)
  .addColumn('persisted',  Lovefield.Type.BOOLEAN)
  .addColumn('title',      Lovefield.Type.STRING)
  .addColumn('categories', Lovefield.Type.STRING)
  .addColumn('content',    Lovefield.Type.STRING)
  .addNullable(['remote_id', 'persisted'])
  .addUnique('idxRemoteId', ['remote_id'])
  .addIndex('idxCreatedAt', ['created_at'])
  .addIndex('idxUpdatedAt', ['updated_at'])
  .addPrimaryKey(['id']);


builder.createTable(CHANGES_RESOURCE)
  .addColumn('id',         Lovefield.Type.STRING)
  .addColumn('resource',   Lovefield.Type.STRING)
  .addColumn('type',       Lovefield.Type.STRING)
  .addColumn('created_at', Lovefield.Type.NUMBER)
  .addColumn('updated_at', Lovefield.Type.NUMBER)
  .addColumn('data',       Lovefield.Type.OBJECT)
  .addIndex('idxCreatedAt', ['created_at'])
  .addIndex('idxUpdatedAt', ['updated_at'])
  .addIndex('idxResourceType', ['resource', 'type'])
  .addPrimaryKey(['id']);


let options = {};

if(isIos()) {
  options = { storeType: Lovefield.schema.DataStoreType.WEB_SQL };
}

export const schema = builder.connect(options);
