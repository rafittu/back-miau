import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeRepository } from '../repository/employee.repository';
import { PrismaService } from '../../../prisma.service';
import { AlmaService } from '../../../common/api/alma/alma.service';
import {
  MockPrismaEmployeeData,
  MockIAlmaUser,
  MockCreateEmployeeDto,
} from './mocks/employee.mock';
import { EmployeeRole, EmployeeStatus } from '@prisma/client';

describe('EmployeeRepository', () => {
  let employeeRepository: EmployeeRepository;
  let prismaService: PrismaService;
  let almaApi: AlmaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeeRepository,
        PrismaService,
        {
          provide: AlmaService,
          useValue: {
            createUser: jest.fn().mockResolvedValue(MockIAlmaUser),
          },
        },
      ],
    }).compile();

    employeeRepository = module.get<EmployeeRepository>(EmployeeRepository);
    prismaService = module.get<PrismaService>(PrismaService);
    almaApi = module.get<AlmaService>(AlmaService);
  });

  it('should be defined', () => {
    expect(employeeRepository).toBeDefined();
    expect(prismaService).toBeDefined();
    expect(almaApi).toBeDefined();
  });

  describe('create user', () => {
    it('should create user successfully', async () => {
      jest
        .spyOn(prismaService.employeeData, 'create')
        .mockResolvedValueOnce(MockPrismaEmployeeData);

      const result = await employeeRepository.createUser(
        MockCreateEmployeeDto,
        EmployeeRole.ADMIN,
        EmployeeStatus.IN_EXPERIENCE,
      );

      expect(almaApi.createUser).toHaveBeenCalledTimes(1);
      expect(prismaService.employeeData.create).toHaveBeenCalledTimes(1);
      expect(result).toEqual(MockPrismaEmployeeData);
    });
  });
});
