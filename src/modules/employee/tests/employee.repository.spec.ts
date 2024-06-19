import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeRepository } from '../repository/employee.repository';
import { PrismaService } from '../../../prisma.service';
import { AlmaService } from '../../../common/api/alma/alma.service';

describe('EmployeeRepository', () => {
  let employeeRepository: EmployeeRepository;
  let prismaService: PrismaService;
  let almaApi: AlmaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeRepository, PrismaService, AlmaService],
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
});
