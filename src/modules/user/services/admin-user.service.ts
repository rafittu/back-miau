import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { IUserRepository } from '../interfaces/repository.interface';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserRole } from '../enum/user-role.enum';
import { AppError } from '../../../common/errors/Error';
import { User } from '../interfaces/user.interface';

@Injectable()
export class CreateAdminUserService {
  constructor(
    @Inject(UserRepository)
    private userRepository: IUserRepository,
  ) {}

  async execute(data: CreateUserDto): Promise<User> {
    const adminSignupToken = process.env.ADMIN_SIGNUP_TOKEN;
    const { signupToken, password, passwordConfirmation } = data;

    if (!signupToken || signupToken !== adminSignupToken) {
      throw new AppError(
        'user-service.createAdminUser',
        400,
        'missing or invalid signup token',
      );
    }
    delete data.signupToken;

    if (password !== passwordConfirmation) {
      throw new AppError(
        'user-service.createAdminUser',
        400,
        'passwords do not match',
      );
    }

    try {
      const user = await this.userRepository.createUser(data, UserRole.ADMIN);

      return user;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      throw new AppError('user-service.createAdminUser', 400, error.message);
    }
  }
}
