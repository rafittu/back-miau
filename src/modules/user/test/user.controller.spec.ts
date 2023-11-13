import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { CreateAdminUserService } from '../services/user-admin.service';
import {
  mockCreateUserBody,
  mockPrismaEmployee,
} from './mocks/user.controller.mock';

describe('UserController', () => {
  let controller: UserController;

  let createAdminService: CreateAdminUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: CreateAdminUserService,
          useValue: {
            execute: jest.fn().mockResolvedValue(mockPrismaEmployee),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);

    createAdminService = module.get<CreateAdminUserService>(
      CreateAdminUserService,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create admin user', () => {
    it('should create a new one successfully', async () => {
      const result = await controller.createAdmin(mockCreateUserBody);

      expect(createAdminService.execute).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockPrismaEmployee);
    });

    // it('should throw an error', async () => {
    //   jest
    //     .spyOn(createAdminService, 'execute')
    //     .mockRejectedValueOnce(new Error());

    //   await expect(
    //     controller.createAdminUser(mockCreateUserBody),
    //   ).rejects.toThrowError();
    // });
  });
});
