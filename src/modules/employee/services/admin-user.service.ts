import { Inject, Injectable } from '@nestjs/common';
import { EmployeeRepository } from '../repository/employee.repository';
import { IEmployeeRepository } from '../interfaces/repository.interface';
import { AppError } from '../../../common/errors/Error';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { EmployeeRole, EmployeeStatus } from '@prisma/client';

@Injectable()
export class CreateAdminService {
  constructor(
    @Inject(EmployeeRepository)
    private userRepository: IEmployeeRepository,
  ) {}

  async execute(data: CreateEmployeeDto) {
    try {
      return await this.userRepository.createUser(
        data,
        EmployeeRole.ADMIN,
        EmployeeStatus.IN_EXPERIENCE,
      );
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      throw new AppError(
        'employee-service.createAdminService',
        400,
        error.message,
      );
    }
  }
}
