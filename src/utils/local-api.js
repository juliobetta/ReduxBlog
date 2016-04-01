import { schema } from './database-schema';
import { generateId, extractConditionsWith, extractUpdatesWith,
         defaults } from './database-utils';


export const fetchAll = ({ resource, params = null }) => {
  return schema.then((database) => {
    const table      = database.getSchema().table(resource);
    const conditions = extractConditionsWith(table, params);

    return database.select().from(table).where(conditions).exec();
  });
};


export const fetchOne = ({ resource, params = null }) => {
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
};


export const create = ({ resource, data }) => {
  return schema.then((database) => {
    const table = database.getSchema().table(resource);
    const row   = table.createRow(defaults(table, data));

    return database.insert().into(table).values([row]).exec().then((r) => {
      if(r[0] === undefined) {
        return Promise.reject();
      }

      return Promise.resolve(r[0]);
    });
  });
};


export const destroy = ({ resource, params = null }) => {
  return schema.then((database) => {
    const table      = database.getSchema().table(resource);
    const conditions = extractConditionsWith(table, params);

    return database.delete().from(table).where(conditions).exec().then(() => {
      return Promise.resolve(param && params.id ? params.id : null);
    });
  });
};


export const update = ({ resource, data, params = null }) => {
  return schema.then((database) => {
    const table      = database.getSchema().table(resource);
    const conditions = extractConditionsWith(table, params);
    const scope      = database.update(table);

    return extractUpdatesWith(scope, table, data)
            .where(conditions)
            .exec()
            .then(() => Promise.resolve(data));
  });
};
