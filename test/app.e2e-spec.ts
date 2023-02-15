import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AuthModule } from '../src/services/auth/auth.module';
import { MoviesModule } from '../src/services/movies/movies.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let token: string;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AuthModule, MoviesModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    const login = await request(app.getHttpServer()).post('/auth/login').send({
      username: 'basic-test',
      password: 'xdgwpeomr6_uNFpg17rr',
    });
    token = `Bearer ${login.body.access_token}`;
  });

  it('/movies (GET)', () => {
    return request(app.getHttpServer()).get('/movies').expect(401);
  });

  it('/movies (POST)', () => {
    return request(app.getHttpServer()).post('/movies').expect(401);
  });

  it('/movies (POST) create or bad request', async () => {
    const response = await request(app.getHttpServer())
      .post('/movies')
      .set('Authorization', token)
      .send({
        title: 'Ten',
      });
    return expect([201, 400]).toContain(response.status);
  });

  it('/movies (POST) api not found item', async () => {
    const response = await request(app.getHttpServer())
      .post('/movies')
      .set('Authorization', token)
      .send({
        title: 'something not in api',
      });
    return expect(response.status).toBe(404);
  });
  it('/movies (GET) api not found item', async () => {
    const response = await request(app.getHttpServer())
      .get('/movies')
      .set('Authorization', token);
    return expect(response.body.length).toBeGreaterThan(0);
  });
});
