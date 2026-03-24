import { init } from '@instantdb/react';
import schema from '../../instant.schema';

const appId = import.meta.env.VITE_INSTANT_APP_ID;

if (!appId) {
  console.error('Missing VITE_INSTANT_APP_ID');
}

const db = init({
  appId: appId ?? '',
  schema,
});

export default db;
