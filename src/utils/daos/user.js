import * as Database      from '../local-api';
import { USERS_RESOURCE } from '../database-schema';


const User = {

  current: () => {
    return Database.fetchOne({ resource: USERS_RESOURCE }).then(
      result => Promise.resolve(result.current_user)
    );
  }

};

export default User;
