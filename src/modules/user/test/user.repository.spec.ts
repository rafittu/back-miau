import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../prisma.service';
import { UserRepository } from '../repository/user.repository';
import { UserRole } from '../enum/user-role.enum';
import { AppError } from '../../../common/errors/Error';
import { Prisma } from '@prisma/client';
import {
  mockCreateUserBody,
  mockPrismaEmployee,
} from './mocks/user.module.mock';

describe('UserRepository', () => {
  let userRepository: UserRepository;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserRepository, PrismaService],
    }).compile();

    userRepository = module.get<UserRepository>(UserRepository);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(userRepository).toBeDefined();
  });

  describe('createUser', () => {
    it('should create new user successfully', async () => {
      jest
        .spyOn(prismaService.employeeInfo, 'create')
        .mockResolvedValueOnce(mockPrismaEmployee);

      const result = await userRepository.createUser(
        mockCreateUserBody,
        UserRole.ADMIN,
      );

      expect(prismaService.employeeInfo.create).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockPrismaEmployee);
    });

    it('should throw an AppError for PrismaClientKnownRequestError', async () => {
      const prismaError = new Prisma.PrismaClientKnownRequestError(
        'error message',
        {
          code: 'error code',
          clientVersion: '',
        },
      );

      jest
        .spyOn(prismaService.employeeInfo, 'create')
        .mockRejectedValueOnce(prismaError);

      try {
        await userRepository.createUser(mockCreateUserBody, UserRole.ADMIN);
      } catch (error) {
        expect(error).toBeInstanceOf(AppError);
        expect(error.code).toBe(400);
        expect(error.message).toBe(
          `[ '${error.meta?.target}' ] already in use`,
        );
      }
    });

    it('should throw an error if user is not created', async () => {
      jest
        .spyOn(prismaService.employeeInfo, 'create')
        .mockRejectedValueOnce(new Error());

      try {
        await userRepository.createUser(mockCreateUserBody, UserRole.EMPLOYEE);
      } catch (error) {
        expect(error).toBeInstanceOf(AppError);
        expect(error.code).toBe(500);
        expect(error.message).toBe('user not created');
      }
    });
  });
});
