import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { SignInService } from '../services/signin.service';
import { mockAccessToken, mockAuthRequest } from './mocks/auth.module.mock';

describe('AuthController', () => {
  let controller: AuthController;

  let signInService: SignInService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: SignInService,
          useValue: {
            execute: jest.fn().mockResolvedValueOnce(mockAccessToken),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    signInService = module.get<SignInService>(SignInService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('user signin', () => {
    it('should return an user access token', async () => {
      const result = await controller.signIn(mockAuthRequest);

      expect(signInService.execute).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockAccessToken);
    });
  });
});
