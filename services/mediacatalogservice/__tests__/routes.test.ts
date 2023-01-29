import { HTTP_BAD_REQUEST, HTTP_NOT_FOUND } from '@utils/constants';
import app from 'app';
import request from 'supertest';

describe('test that route handlers can handle errors gracefully', () => {
  test('should return a 404 status code', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(HTTP_NOT_FOUND);
  });

  test('should return 400 bad request for string id', async () => {
    const response = await request(app).get('/media/test');
    expect(response.statusCode).toBe(HTTP_BAD_REQUEST);
  });

  test('should return 400 bad request for symbol id', async () => {
    const response = await request(app).get('/media/@@');
    expect(response.statusCode).toBe(HTTP_BAD_REQUEST);
  });

  test('should return 400 bad request for string page', async () => {
    const response = await request(app).get('/genre/test');
    expect(response.statusCode).toBe(HTTP_BAD_REQUEST);
  });

  test('should return 400 bad request for symbol page', async () => {
    const response = await request(app).get('/genre/@@');
    expect(response.statusCode).toBe(HTTP_BAD_REQUEST);
  });
});
