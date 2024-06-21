import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeRepository } from '../repository/employee.repository';
import { PrismaService } from '../../../prisma.service';
import { AlmaService } from '../../../common/api/alma/alma.service';
import {
  MockPrismaEmployeeData,
  MockIAlmaUser,
  MockCreateEmployeeDto,
} from './mocks/employee.mock';
import { EmployeeRole, EmployeeStatus, Prisma } from '@prisma/client';
import { AppError } from '../../../common/app_error/errors/Error';

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

    it('should throw an AppError for PrismaClientKnownRequestError', async () => {
      const prismaError = new Prisma.PrismaClientKnownRequestError(
        'error message',
        {
          code: 'error code',
          clientVersion: '',
        },
      );

      jest.spyOn(almaApi, 'createUser').mockRejectedValueOnce(prismaError);

      try {
        await employeeRepository.createUser(
          MockCreateEmployeeDto,
          EmployeeRole.ADMIN,
          EmployeeStatus.IN_EXPERIENCE,
        );
      } catch (error) {
        expect(error).toBeInstanceOf(AppError);
        expect(error.code).toBe(400);
        expect(error.message).toBe(
          `[ '${error.meta?.target}' ] already in use`,
        );
      }
    });

    it('should throw an AppError if user is not created in external api', async () => {
      jest
        .spyOn(almaApi, 'createUser')
        .mockRejectedValueOnce(
          new AppError('alma-service.createUser', 500, 'error.message'),
        );

      try {
        await employeeRepository.createUser(
          MockCreateEmployeeDto,
          EmployeeRole.ADMIN,
          EmployeeStatus.IN_EXPERIENCE,
        );
      } catch (error) {
        expect(error).toBeInstanceOf(AppError);
        expect(error.code).toBe(500);
        expect(error.message).toBe('error.message');
      }
    });

    it('should throw an error if user is not created', async () => {
      jest
        .spyOn(prismaService.employeeData, 'create')
        .mockRejectedValueOnce(new Error());

      try {
        await employeeRepository.createUser(
          MockCreateEmployeeDto,
          EmployeeRole.ADMIN,
          EmployeeStatus.IN_EXPERIENCE,
        );
      } catch (error) {
        expect(error).toBeInstanceOf(AppError);
        expect(error.code).toBe(500);
        expect(error.message).toBe('user not created');
      }
    });
  });
});
