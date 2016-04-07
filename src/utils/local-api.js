import { schema } from './database-schema';
import { extractConditionsWith, extractUpdatesWith,
         extractOptionsWith, defaults } from './database-utils';


export function fetchAll({ resource, params = {}, options = {} }) {
  return schema.then((database) => {
    const table      = database.getSchema().table(resource);
    const conditions = extractConditionsWith(table, params);
    const scope      = database.select().from(table);

    return extractOptionsWith(scope, table, options).where(conditions).exec();
  });
}


export function fetchOne({ resource, params = {} }) {
  return schema.then((database) => {
    const table      = database.getSchema().table(resource);
    const conditions = extractConditionsWith(table, params);

    return database.select().from(table).where(conditions).exec().then((r) => {
      if(r[0] === undefined) {
        return Promise.reject();
      }

      return Promise.resolve(r[0]);
    });
  });
}


export function create({ resource, data }, transaction = false) {
  return schema.then((database) => {
    const table = database.getSchema().table(resource);
    const row   = table.createRow(defaults(table, data));
    const scope = database.insert().into(table).values([row]);

    if(transaction) {
      return scope;
    }

    return scope.exec().then(
      (result) => {
        if(result[0] === undefined) {
          return Promise.reject();
        }

        return Promise.resolve(result[0]);
      }
    );
  });
}


export function destroy({ resource, params = {} }, transaction = false) {
  return schema.then((database) => {
    const table      = database.getSchema().table(resource);
    const conditions = extractConditionsWith(table, params);
    const scope      = database.delete().from(table).where(conditions);

    if(transaction) {
      return scope;
    }

    return scope.exec().then(() => {
      return Promise.resolve(params.id || null);
    });
  });
}


export function softDelete({ resource, params = {} }, transaction = false) {
  return schema.then((database) => {
    const table      = database.getSchema().table(resource);
    const conditions = extractConditionsWith(table, params);
    const scope      = database.update(table).set(table.updated_at, +new Date())
                                             .set(table.deleted_at, +new Date())
                                             .where(conditions);
    if(transaction) {
      return scope;
    }

    return scope.exec().then(() => {
      return Promise.resolve(params.id || null);
    });
  });
}


export function update({ resource, data, params = {}}, transaction = false) {
  return schema.then((database) => {
    const table      = database.getSchema().table(resource);
    const conditions = extractConditionsWith(table, params);

    let scope = database.update(table);

    if(params.id) {
      data = { ...data, id: params.id };
    }

    scope = extractUpdatesWith(scope, table, data).where(conditions);

    if(transaction) {
      return scope;
    }

    return scope.exec().then(() => Promise.resolve(data));
  });
}


export function processInBulk(data) {
  return schema.then((database) => {
    const tx      = database.createTransaction();
    const queries = [];

    let resource, table;

    for(resource of Object.keys(data)) {
      let attrs, query;
      table = database.getSchema().table(resource);

      for(attrs of data[resource]) {

        if(attrs.deleted_at) {
          query = database.delete().from(table)
                          .where(table.remote_id.eq(attrs.remote_id));
        } else {
          query = database.update(table).set(table.remote_id, attrs.remote_id)
                                        .where(table.id.eq(attrs.id));
        }

        queries.push(query);
      }
    }

    return tx.exec(queries);
  });
}
