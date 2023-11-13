import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../prisma.service';
import { AppError } from '../../../common/errors/Error';
import { IUserRepository } from '../interfaces/repository.interface';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserRole } from '../enum/user-role.enum';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private prisma: PrismaService) {}

  async createUser(data: CreateUserDto, role: UserRole) {
    const {
      firstName,
      lastName,
      username,
      email,
      password,
      phone,
      position,
      status,
    } = data;

    try {
      const userBodyRequest = {
        first_name: firstName,
        last_name: lastName,
        username,
        email,
        password,
        phone,
        position,
        role,
        status,
      };

      const user = await this.prisma.employeeInfo.create({
        data: userBodyRequest,
      });

      return user;
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
