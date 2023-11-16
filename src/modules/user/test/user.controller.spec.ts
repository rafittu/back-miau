import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { CreateAdminUserService } from '../services/admin-user.service';
import { mockCreateUserBody, mockUser } from './mocks/user.module.mock';
import { CreateEmployeeUserService } from '../services/employee-user.service';

describe('UserController', () => {
  let controller: UserController;

  let createAdminService: CreateAdminUserService;
  let createEmployeeService: CreateEmployeeUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: CreateAdminUserService,
          useValue: {
            execute: jest.fn().mockResolvedValue(mockUser),
          },
        },
        {
          provide: CreateEmployeeUserService,
          useValue: {
            execute: jest.fn().mockResolvedValue(mockUser),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);

    createAdminService = module.get<CreateAdminUserService>(
      CreateAdminUserService,
    );
    createEmployeeService = module.get<CreateEmployeeUserService>(
      CreateEmployeeUserService,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create admin user', () => {
    it('should create a new one successfully', async () => {
      const result = await controller.createAdmin(mockCreateUserBody);

      expect(createAdminService.execute).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockUser);
    });

    it('should throw an error', async () => {
      jest
        .spyOn(createAdminService, 'execute')
        .mockRejectedValueOnce(new Error());

      await expect(
        controller.createAdmin(mockCreateUserBody),
      ).rejects.toThrow();
    });
  });

  describe('create employee user', () => {
    it('should create a new one successfully', async () => {
      const result = await controller.createEmployee(mockCreateUserBody);

      expect(createEmployeeService.execute).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockUser);
    });

    it('should throw an error', async () => {
      jest
        .spyOn(createEmployeeService, 'execute')
        .mockRejectedValueOnce(new Error());

      await expect(
        controller.createEmployee(mockCreateUserBody),
      ).rejects.toThrow();
    });
  });
});
