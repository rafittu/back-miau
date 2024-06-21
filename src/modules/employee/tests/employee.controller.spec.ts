import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeController } from '../employee.controller';
import { CreateAdminService } from '../services/admin-user.service';
import {
  MockCreateEmployeeDto,
  MockICreateEmployee,
} from './mocks/employee.mock';

describe('EmployeeController', () => {
  let controller: EmployeeController;

  let createAdminService: CreateAdminService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeController],
      providers: [
        {
          provide: CreateAdminService,
          useValue: {
            execute: jest.fn().mockResolvedValue(MockICreateEmployee),
          },
        },
      ],
    }).compile();

    controller = module.get<EmployeeController>(EmployeeController);

    createAdminService = module.get<CreateAdminService>(CreateAdminService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create admin user', () => {
    it('should create a new admin user successfully', async () => {
      const result = await controller.createAdmin(MockCreateEmployeeDto);

      expect(createAdminService.execute).toHaveBeenCalledTimes(1);
      expect(result).toEqual(MockICreateEmployee);
    });
  });
});
