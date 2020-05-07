import { Alert } from './entity/Alert';
import { Gyms } from './entity/Gym';
import { Membership } from './entity/Membership';
import { Preferences } from './entity/Preferences';
import { User } from './entity/User';
import { Reviews } from './entity/Reviews';
import { createConnection } from 'typeorm';

export const createtypeormConnection = async () => {
  let retries = 10;
  while (retries) {
    try {
      await createConnection(
        process.env.NODE_ENV === 'production'
          ? {
              type: 'postgres',
              host: 'db',
              port: 5432,
              username: 'tom',
              password: 'test',
              database: 'wander',
              synchronize: true,
              entities: [Alert, Gyms, Membership, Preferences, User, Reviews],
            }
          : {
              type: 'postgres',
              host: 'localhost',
              port: 5432,
              username: 'tom',
              password: 'test',
              database: 'wanderer-db',
              synchronize: true,
              entities: [Alert, Gyms, Membership, Preferences, User, Reviews],
            }
      );
      break;
    } catch (err) {
      console.log(err);
      retries -= 1;
      console.log(`retries left: ${retries}`);
      // wait 5 seconds
      await new Promise((res) => setTimeout(res, 5000));
    }
  }
  console.log('it works');
};
