import { Alert } from './entity/Alert';
import { Gyms } from './entity/Gym';
import { Membership } from './entity/Membership';
import { Preferences } from './entity/Preferences';
import { User } from './entity/User';
import { Reviews } from './entity/Reviews';
import { createConnection } from 'typeorm';

export const createtypeormConnection = async () => {
  await createConnection(
    process.env.NODE_ENV === 'production'
      ? {
          type: 'postgres',
          host: 'host.docker.internal',
          port: 5432,
          username: 'tom',
          password: 'test',
          database: 'wanderer-db',
          synchronize: true,
          entities: [Alert, Gyms, Membership, Preferences, User, Reviews],
          logger: 'debug',
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
};
