import * as Database      from '../local-api';
import { USERS_RESOURCE } from '../database-schema';


class User {

  static current() {
    return Database.fetchOne({ resource: USERS_RESOURCE }).then(
      result => Promise.resolve(result.current_user)
    );
  }


  static save(data) {
    return User.destroy().then(() => {
      return Database.create({
        resource: USERS_RESOURCE,
        data: { current_user: data }
      }).then((result) => {
        return Promise.resolve(result.current_user);
      });
    });
  }


  static destroy() {
    return Database.destroy({ resource: USERS_RESOURCE });
  }

};

export default User;
