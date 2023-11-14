import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { SignInService } from '../services/signin.service';
import { mockJwt } from './mocks/auth.module.mock';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: SignInService,
          useValue: {
            execute: jest.fn().mockResolvedValueOnce(mockJwt),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
