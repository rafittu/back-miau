import { Injectable } from '@nestjs/common';
import {
  EmployeeData,
  EmployeeRole,
  EmployeeStatus,
  Prisma,
} from '@prisma/client';
import { PrismaService } from '../../../prisma.service';
import { AppError } from '../../../common/app_error/errors/Error';
import { IEmployeeRepository } from '../interfaces/repository.interface';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { AlmaService } from '../../../common/api/alma/alma.service';

@Injectable()
export class EmployeeRepository implements IEmployeeRepository {
  constructor(
    private prisma: PrismaService,
    private almaApi: AlmaService,
  ) {}

  async createUser(
    data: CreateEmployeeDto,
    role: EmployeeRole,
    status: EmployeeStatus,
  ): Promise<EmployeeData> {
    try {
      const { id } = await this.almaApi.createUser(data);

      const employeeData = {
        alma_id: id,
        first_name: data.firstName,
        last_name: data.lastName,
        username: data.username,
        email: data.email,
        phone: data.phone,
        position: data.position,
        role,
        status,
      };

      return await this.prisma.employeeData.create({
        data: employeeData,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new AppError(
          `user-repository.createUser`,
          400,
          `[ '${error.meta?.target}' ] already in use`,
        );
      }

      if (error instanceof AppError) {
        throw new AppError('alma-service.createUser', 500, error.message);
      }

      throw new AppError('user-repository.createUser', 500, 'user not created');
    }
  }
}
