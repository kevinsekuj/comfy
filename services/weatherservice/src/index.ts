import { HTTP_NOT_FOUND } from '@utils/constants';
import HTTPError from '@utils/httpError';
import isProductionEnvironment from '@utils/isProductionEnvironment';
import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import app from './app';

if (!isProductionEnvironment()) dotenv.config();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  /* eslint-disable no-console */
  console.log(`Listening on port ${PORT}`);
});

app.get('/weather', (_req: Request, res: Response) => {
  res.redirect('weather');
});

app.all('*', (_req: Request, _res: Response, next: NextFunction) => {
  next(new HTTPError('Resource not found', HTTP_NOT_FOUND));
});

app.use((err: HTTPError, _req: Request, res: Response, next: NextFunction) => {
  res.status(err.status).json({ error: err.message, status: err.status });
  next();
});
