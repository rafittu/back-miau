import { Test, TestingModule } from '@nestjs/testing';
import { SignInService } from '../services/signin.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let signInService: SignInService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SignInService, JwtService],
    }).compile();

    signInService = module.get<SignInService>(SignInService);
  });

  it('should be defined', () => {
    expect(signInService).toBeDefined();
  });
});
