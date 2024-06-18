import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeController } from '../employee.controller';
import { CreateAdminService } from '../services/admin-user.service';

describe('EmployeeController', () => {
  let controller: EmployeeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeController],
      providers: [
        {
          provide: CreateAdminService,
          useValue: {
            execute: jest.fn().mockResolvedValue(''),
          },
        },
      ],
    }).compile();

    controller = module.get<EmployeeController>(EmployeeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
