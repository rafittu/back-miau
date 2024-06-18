import { Inject, Injectable } from '@nestjs/common';
import { EmployeeRepository } from '../repository/employee.repository';
import { IEmployeeRepository } from '../interfaces/repository.interface';
import { AppError } from '../../../common/errors/Error';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { EmployeeRole, EmployeeStatus } from '@prisma/client';
import { ICreateEmployee } from '../interfaces/employee.interface';

@Injectable()
export class CreateAdminService {
  constructor(
    @Inject(EmployeeRepository)
    private userRepository: IEmployeeRepository,
  ) {}

  async execute(data: CreateEmployeeDto): Promise<ICreateEmployee> {
    const { firstName, lastName, email, phone, position } = data;

    try {
      const { id, alma_id, created_at } = await this.userRepository.createUser(
        data,
        EmployeeRole.ADMIN,
        EmployeeStatus.IN_EXPERIENCE,
      );

      const employee = {
        message: 'User created successfully',
        data: {
          id,
          almaId: alma_id,
          firstName,
          lastName,
          email,
          phone,
          position,
          role: EmployeeRole.ADMIN,
          status: EmployeeStatus.IN_EXPERIENCE,
          createdAt: created_at,
        },
      };

      return employee;
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
