import { Test, TestingModule } from '@nestjs/testing';
import { CreateAdminUserService } from '../services/user-admin.service';
import { UserRepository } from '../repository/user.repository';
import { AppError } from '../../../common/errors/Error';
import { mockPrismaEmployee } from './mocks/user.repository.mock';
import { mockCreateUserBody } from './mocks/user.services.mock';

describe('UserServices', () => {
  let createAdminService: CreateAdminUserService;

  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateAdminUserService,
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
  });
});
