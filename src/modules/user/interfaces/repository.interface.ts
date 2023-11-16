import { EmployeeInfo, EmployeeRole, EmployeeStatus } from '@prisma/client';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserRole } from '../enum/user-role.enum';

export interface IUserRepository {
  createUser(data: CreateUserDto, role: UserRole): Promise<EmployeeInfo>;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  position: string;
  role: EmployeeRole;
  status: EmployeeStatus;
  createdAt: Date;
  updatedAt: Date;
}
