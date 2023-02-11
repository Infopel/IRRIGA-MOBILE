import LokiJSAdapter from '@nozbe/watermelondb/adapters/lokijs';
import migrations from '../migrations';
import {schema} from '../schema';

const adapter = new LokiJSAdapter({
  schema,
  // migrations,
  dbName:'irriga',
  useWebWorker: false,
  useIncrementalIndexedDB: true,
});

export default adapter;