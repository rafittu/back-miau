import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppModule } from '../app.module';

describe('AppModule', () => {
  let app: TestingModule;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      imports: [
        AppModule,
        ConfigModule.forRoot({
          isGlobal: true,
        }),
      ],
    }).compile();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

  it('should use the correct port', async () => {
    const configService = app.get<ConfigService>(ConfigService);
    const port = configService.get<number>('PORT');
    expect(port).toBe(3001);
  });

  it('should have a valid database URL', async () => {
    const configService = app.get<ConfigService>(ConfigService);
    const databaseURL = configService.get<string>('DATABASE_URL');
    expect(databaseURL).toBeDefined();
  });
});
