import { CreateUserDto } from '../dto/create-user.dto';
import { UserRole } from '../enum/user-role.enum';
import { User } from './user.interface';

export interface IUserRepository {
  createUser(data: CreateUserDto, role: UserRole): Promise<User>;
}
