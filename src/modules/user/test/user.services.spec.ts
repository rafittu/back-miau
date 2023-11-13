import { Test, TestingModule } from '@nestjs/testing';
import { CreateAdminUserService } from '../services/user-admin.service';
import { UserRepository } from '../repository/user.repository';
// import { AppError } from '../../../common/errors/Error';
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
  });

  it('should be defined', () => {
    expect(createAdminService).toBeDefined();
  });

  describe('create admin user', () => {
    it('should create a new one successfully', async () => {
      process.env.ADMIN_SIGNUP_TOKEN = mockCreateUserBody.signupToken;

      jest
        .spyOn(userRepository, 'createUser')
        .mockResolvedValueOnce(mockPrismaEmployee);

      const result = await createAdminService.execute(mockCreateUserBody);

      delete process.env.ADMIN_SIGNUP_TOKEN;

      expect(userRepository.createUser).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockPrismaEmployee);
    });

    // it('should throw an error if missing signup token', async () => {
    //   process.env.ADMIN_SIGNUP_TOKEN = 'admin_signup_token';

    //   jest
    //     .spyOn(userRepository, 'createUser')
    //     .mockRejectedValueOnce(new Error());

    //   const modifiedCreateUserBody = {
    //     ...mockCreateUserBody,
    //   };

    //   delete modifiedCreateUserBody.signupToken;

    //   try {
    //     await createAdminService.execute(modifiedCreateUserBody);
    //   } catch (error) {
    //     expect(error).toBeInstanceOf(AppError);
    //     expect(error.code).toBe(400);
    //   }
    // });

    // it('should throw an App Error', async () => {
    //   process.env.ADMIN_SIGNUP_TOKEN = 'admin_signup_token';

    //   jest
    //     .spyOn(userRepository, 'createUser')
    //     .mockRejectedValueOnce(
    //       new AppError('error.code', 401, 'Error message'),
    //     );

    //   try {
    //     mockCreateUserBody.signupToken = 'admin_signup_token';
    //     await createAdminService.execute(mockCreateUserBody);
    //   } catch (error) {
    //     delete process.env.ADMIN_SIGNUP_TOKEN;
    //     expect(error).toBeInstanceOf(AppError);
    //     expect(error.code).toBe(401);
    //   }
    // });

    // it('should throw an error', async () => {
    //   process.env.ADMIN_SIGNUP_TOKEN = 'admin_signup_token';
    //   mockCreateUserBody.signupToken = 'admin_signup_token';

    //   jest
    //     .spyOn(userRepository, 'createUser')
    //     .mockRejectedValueOnce(new Error());

    //   try {
    //     await createAdminService.execute(mockCreateUserBody);
    //   } catch (error) {
    //     expect(error).toBeInstanceOf(AppError);
    //     expect(error.code).toBe(400);
    //   }
    // });
  });
});
