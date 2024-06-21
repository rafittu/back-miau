import { Test, TestingModule } from '@nestjs/testing';
import { CreateAdminService } from '../services/admin-user.service';
import { EmployeeRepository } from '../repository/employee.repository';
import {
  MockCreateEmployeeDto,
  MockICreateEmployee,
  MockPrismaEmployeeData,
} from './mocks/employee.mock';

describe('Employee Services', () => {
  let createAdminService: CreateAdminService;

  let employeeRepository: EmployeeRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateAdminService,
        {
          provide: EmployeeRepository,
          useValue: {
            createUser: jest.fn().mockResolvedValue(MockPrismaEmployeeData),
          },
        },
      ],
    }).compile();

    createAdminService = module.get<CreateAdminService>(CreateAdminService);

    employeeRepository = module.get<EmployeeRepository>(EmployeeRepository);
  });

  it('should be defined', () => {
    expect(createAdminService).toBeDefined();
  });

  describe('create admin user', () => {
    it('should create a new one successfully', async () => {
      const result = await createAdminService.execute(MockCreateEmployeeDto);

      expect(employeeRepository.createUser).toHaveBeenCalledTimes(1);
      expect(result).toEqual(MockICreateEmployee);
    });
  });
});
