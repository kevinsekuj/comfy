import functions from '@google-cloud/functions-framework';
import createLookupTable from './createLookupTable.js';

const ALLOWED_ORIGINS = ['http://localhost:3000'];

functions.http('getLookupTable', async (req, res) => {
  const { origin } = req.headers;
  if (ALLOWED_ORIGINS.includes(origin)) {
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  const table = await createLookupTable();
  res.json(Object.fromEntries(table));
});
