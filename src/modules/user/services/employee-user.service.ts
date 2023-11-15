import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { IUserRepository } from '../interfaces/repository.interface';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserRole } from '../enum/user-role.enum';
import { AppError } from '../../../common/errors/Error';
import { EmployeeInfo } from '@prisma/client';

@Injectable()
export class CreateEmployeeUserService {
  constructor(
    @Inject(UserRepository)
    private userRepository: IUserRepository,
  ) {}

  async execute(data: CreateUserDto): Promise<EmployeeInfo> {
    const { password, passwordConfirmation } = data;

    if (password !== passwordConfirmation) {
      throw new AppError(
        'user-service.createEmployeeUser',
        400,
        'passwords do not match',
      );
    }

    try {
      const user = await this.userRepository.createUser(
        data,
        UserRole.EMPLOYEE,
      );

      return user;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      throw new AppError('user-service.createEmployeeUser', 400, error.message);
    }
  }
}
