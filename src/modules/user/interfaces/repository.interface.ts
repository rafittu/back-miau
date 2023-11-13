import { EmployeeInfo } from '@prisma/client';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserRole } from '../enum/user-role.enum';

export interface IUserRepository {
  createUser(data: CreateUserDto, role: UserRole): Promise<EmployeeInfo>;
}
