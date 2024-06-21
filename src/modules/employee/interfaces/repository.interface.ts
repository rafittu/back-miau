import { EmployeeData, EmployeeRole, EmployeeStatus } from '@prisma/client';
import { CreateEmployeeDto } from '../dto/create-employee.dto';

export interface IEmployeeRepository {
  createUser(
    data: CreateEmployeeDto,
    role: EmployeeRole,
    status: EmployeeStatus,
  ): Promise<EmployeeData>;
}
