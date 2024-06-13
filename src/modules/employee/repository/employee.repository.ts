import { Injectable } from '@nestjs/common';
import { EmployeeRole, EmployeeStatus, Prisma } from '@prisma/client';
import { PrismaService } from '../../../prisma.service';
import { AppError } from '../../../common/errors/Error';
import { IEmployeeRepository } from '../interfaces/repository.interface';
import { CreateEmployeeDto } from '../dto/create-employee.dto';

@Injectable()
export class EmployeeRepository implements IEmployeeRepository {
  constructor(private prisma: PrismaService) {}

  async createUser(
    data: CreateEmployeeDto,
    role: EmployeeRole,
    status: EmployeeStatus,
  ) {
    try {
      const employeeData = await this.almaApi.createUser({
        data,
      });

      await this.prisma.employeeData.create({
        data: { employeeData, role, status },
      });

      return;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new AppError(
          `user-repository.createUser`,
          400,
          `[ '${error.meta?.target}' ] already in use`,
        );
      }

      throw new AppError('user-repository.createUser', 500, 'user not created');
    }
  }
}
