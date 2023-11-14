import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../prisma.service';
import { AuthRepository } from '../repository/auth.repository';
import * as bcrypt from 'bcrypt';
import {
  mockPrismaFindFirst,
  mockUserCredentials,
  mockUserValidated,
} from './mocks/auth.module.mock';

describe('Auth Repository', () => {
  let authRepository: AuthRepository;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthRepository, PrismaService],
    }).compile();

    authRepository = module.get<AuthRepository>(AuthRepository);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(authRepository).toBeDefined();
    expect(prismaService).toBeDefined();
  });

  describe('validate user', () => {
    it('should validate user credentials successfully', async () => {
      jest
        .spyOn(prismaService.employeeInfo, 'findFirst')
        .mockResolvedValueOnce(mockPrismaFindFirst);

      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);

      const result = await authRepository.validateUser(mockUserCredentials);

      expect(prismaService.employeeInfo.findFirst).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockUserValidated);
    });
  });
});
