import { HTTP_BAD_REQUEST, HTTP_NOT_FOUND } from '@utils/constants';
import app from 'app';
import request from 'supertest';

describe('test that route handlers can handle errors gracefully', () => {
  test('should return a 404 status code', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(HTTP_NOT_FOUND);
  });

  test('should return 400 bad request for missing parameters', async () => {
    const response = await request(app).get('/weather');
    expect(response.statusCode).toBe(HTTP_BAD_REQUEST);
  });

  test('should return 400 bad request for partially missing parameters', async () => {
    const response = await request(app).get('/weather?latitude=4');
    expect(response.statusCode).toBe(HTTP_BAD_REQUEST);
  });

  test('should return 400 bad request for invalid parameters', async () => {
    const response = await request(app).get('/weather?a=2&b=3');
    expect(response.statusCode).toBe(HTTP_BAD_REQUEST);
  });
});
