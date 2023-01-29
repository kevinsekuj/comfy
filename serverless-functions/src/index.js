import functions from '@google-cloud/functions-framework';
import createLookupTable from './createLookupTable.js';

functions.http('getLookupTable', async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  const table = await createLookupTable();
  res.json(Object.fromEntries(table));
});
