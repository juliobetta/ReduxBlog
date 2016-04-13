import * as Database      from '../utils/local-api';
import { USERS_RESOURCE } from '../utils/database-schema';


const User = {

  current: () => {
    return Database.fetchOne({ resource: USERS_RESOURCE }).then(
      result => Promise.resolve(result.current_user)
    );
  }

};

export default User;
