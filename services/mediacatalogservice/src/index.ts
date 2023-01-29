import { HTTP_NOT_FOUND } from '@utils/constants';
import HTTPError from '@utils/httpError';
import isProductionEnvironment from '@utils/isProductionEnvironment';
import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import app from './app';

const PORT = process.env.PORT || 4001;
if (!isProductionEnvironment()) dotenv.config();

app.listen(PORT, () => {
  // eslint-disable-next-line
  console.log(`Listening on port ${PORT}`);
});

app.get('/all-media', (_req: Request, res: Response) => {
  res.redirect('all-media');
});

app.all('*', (_req: Request, _res: Response, next: NextFunction) => {
  next(new HTTPError('Resource not found', HTTP_NOT_FOUND));
});

app.use((err: HTTPError, _req: Request, res: Response, next: NextFunction) => {
  res.status(err.status).json({ error: err.message, status: err.status });
  next();
});
