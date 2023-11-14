import { Test, TestingModule } from '@nestjs/testing';
import { SignInService } from '../services/signin.service';
import { JwtService } from '@nestjs/jwt';
import {
  mockJwt,
  mockJwtPayload,
  mockSigninPayload,
} from './mocks/auth.module.mock';

describe('AuthService', () => {
  let signInService: SignInService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SignInService, JwtService],
    }).compile();

    signInService = module.get<SignInService>(SignInService);

    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(signInService).toBeDefined();
    expect(jwtService).toBeDefined();
  });

  describe('signin', () => {
    it('should return a user token', () => {
      jest.spyOn(jwtService, 'sign').mockReturnValue(mockJwt);

      const result = signInService.execute(mockSigninPayload);

      expect(jwtService.sign).toHaveBeenCalledWith(mockJwtPayload);
      expect(result).toEqual({ accessToken: mockJwt });
    });
  });
});
