import type { InstantRules } from '@instantdb/react';
import type { AppSchema } from './instant.schema';

const rules: InstantRules<AppSchema> = {
  clients: {
    allow: {
      view: 'true',
      create: 'true',
      update: 'true',
      delete: 'true',
    },
  },
};

export default rules;
