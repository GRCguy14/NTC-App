import { i } from '@instantdb/react';

const _schema = i.schema({
  entities: {
    clients: i.entity({
      srNo: i.number(),
      cardNo: i.string(),
      name: i.string(),
      freq: i.number(),
      noOfACs: i.number(),
      jetOrSimple: i.string(),
      dueDate: i.string(),
      startDate: i.string(),
      isManual: i.boolean(),
      primaryContactName: i.string().optional(),
      primaryPhone: i.string().optional(),
      secondaryContactName: i.string().optional(),
      secondaryPhone: i.string().optional(),
    }),
  },
  links: {},
  rooms: {},
});

type _AppSchema = typeof _schema;
interface AppSchema extends _AppSchema {}
const schema: AppSchema = _schema;

export type { AppSchema };
export default schema;
