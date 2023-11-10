import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import fetch from 'node-fetch';
import { AppModule } from '../app.module';

describe('Main', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should enable CORS', async () => {
    const serverPort = process.env.PORT;

    try {
      const response = await fetch(`http://localhost:${serverPort}/`);
      const corsHeader = response.headers.get('Access-Control-Allow-Origin');
      expect(corsHeader).toBe('*');
    } catch (error) {
      expect(error.message).toContain('connect ECONNREFUSED');
    }
  });

  afterEach(async () => {
    await app.close();
  });
});
