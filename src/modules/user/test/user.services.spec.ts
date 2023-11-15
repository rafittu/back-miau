import { Test, TestingModule } from '@nestjs/testing';
import { CreateAdminUserService } from '../services/admin-user.service';
import { UserRepository } from '../repository/user.repository';
import { AppError } from '../../../common/errors/Error';
import {
  mockCreateUserBody,
  mockPrismaEmployee,
} from './mocks/user.module.mock';
import { CreateEmployeeUserService } from '../services/employee-user.service';

describe('UserServices', () => {
  let createAdminService: CreateAdminUserService;
  let createEmployeeService: CreateEmployeeUserService;

  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateAdminUserService,
        CreateEmployeeUserService,
        {
          provide: UserRepository,
          useValue: {
            createUser: jest.fn(),
          },
        },
      ],
    }).compile();

    createAdminService = module.get<CreateAdminUserService>(
      CreateAdminUserService,
    );
    createEmployeeService = module.get<CreateEmployeeUserService>(
      CreateEmployeeUserService,
    );

    userRepository = module.get<UserRepository>(UserRepository);

    mockCreateUserBody.signupToken = 'signupToken';
    process.env.ADMIN_SIGNUP_TOKEN = mockCreateUserBody.signupToken;
  });

  afterEach(() => {
    jest.clearAllMocks();
    delete process.env.ADMIN_SIGNUP_TOKEN;
  });

  it('should be defined', () => {
    expect(createAdminService).toBeDefined();
    expect(createEmployeeService).toBeDefined();
  });

  describe('create admin user', () => {
    it('should create a new one successfully', async () => {
      jest
        .spyOn(userRepository, 'createUser')
        .mockResolvedValueOnce(mockPrismaEmployee);

      const result = await createAdminService.execute(mockCreateUserBody);

      expect(userRepository.createUser).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockPrismaEmployee);
    });

    it('should throw an error if missing signup token', async () => {
      delete mockCreateUserBody.signupToken;

      try {
        await createAdminService.execute(mockCreateUserBody);
      } catch (error) {
        expect(error).toBeInstanceOf(AppError);
        expect(error.code).toBe(400);
      }
    });

    it('should throw an error if passwords do not match', async () => {
      const invalidPasswordBody = {
        ...mockCreateUserBody,
        passwordConfirmation: 'invalidPassword',
      };

      try {
        await createAdminService.execute(invalidPasswordBody);
      } catch (error) {
        expect(error).toBeInstanceOf(AppError);
        expect(error.code).toBe(400);
      }
    });

    it('should throw an App Error', async () => {
      jest
        .spyOn(userRepository, 'createUser')
        .mockRejectedValueOnce(
          new AppError('error.code', 401, 'Error message'),
        );

      try {
        await createAdminService.execute(mockCreateUserBody);
      } catch (error) {
        expect(error).toBeInstanceOf(AppError);
        expect(error.code).toBe(401);
      }
    });

    it('should throw an error', async () => {
      jest
        .spyOn(userRepository, 'createUser')
        .mockRejectedValueOnce(new Error());

      try {
        await createAdminService.execute(mockCreateUserBody);
      } catch (error) {
        expect(error).toBeInstanceOf(AppError);
        expect(error.code).toBe(400);
      }
    });
  });

  describe('create employee user', () => {
    it('should create a new one successfully', async () => {
      mockPrismaEmployee.role = 'EMPLOYEE';

      jest
        .spyOn(userRepository, 'createUser')
        .mockResolvedValueOnce(mockPrismaEmployee);

      const result = await createEmployeeService.execute(mockCreateUserBody);

      expect(userRepository.createUser).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockPrismaEmployee);
    });
  });
});
