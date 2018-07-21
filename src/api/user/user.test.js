/* eslint no-undef: 0 */

// a fallback for developers who would run jest directly from the terminal
process.env.NODE_ENV = 'test';

const knex = require('../../config/knex.js');
const logger = require('../../utils/logger.js');
const request = require('supertest');
const faker = require('faker');
const app = require('../../config/express.js');
const httpStatus = require('http-status');

const USERS_URL = '/api/v1/users';

beforeAll(async () => {
  await knex.migrate.latest();
  logger.info('users tests: ran migrations on test db');
});

describe('POST /users API test', () => {
  test('should insert and returns the inserted user', async () => {
    const userBody = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    const expectedResponse = {
      code: httpStatus.OK,
      message: expect.any(String),
      data: {
        email: userBody.email,
        id: expect.any(Number),
        password: expect.any(String),
        created_at: expect.any(String),
        updated_at: expect.any(String),
      },
    };
    const res = await request(app).post(USERS_URL).send(userBody);
    expect(res.status).toBe(httpStatus.OK);
    expect(res.body).toEqual(expectedResponse);
  });

  test('should fail when body is incorrect', async () => {
    const invalidUserBody = {
      email: faker.lorem.word,
      password: faker.lorem.word,
    };
    const expectedResponse = {
      code: httpStatus.BAD_REQUEST,
      message: expect.any(String),
      stack: {},
    };
    const res = await request(app).post(USERS_URL).send(invalidUserBody);
    expect(res.status).toBe(httpStatus.BAD_REQUEST);
    expect(res.body).toEqual(expectedResponse);
  });
});

afterAll(async () => {
  await knex.migrate.rollback();
  logger.info('users tests: rolled back migrations on test db');
});
