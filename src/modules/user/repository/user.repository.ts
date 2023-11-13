import { Injectable } from '@nestjs/common';
import { EmployeeInfo, Prisma } from '@prisma/client';
import { PrismaService } from '../../../prisma.service';
import { AppError } from '../../../common/errors/Error';
import { IUserRepository } from '../interfaces/repository.interface';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserRole } from '../enum/user-role.enum';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private prisma: PrismaService) {}

  async createUser(data: CreateUserDto, role: UserRole): Promise<EmployeeInfo> {
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
      const salt = await bcrypt.genSalt();
      const encryptedPassword = await bcrypt.hash(password, salt);

      const userBodyRequest = {
        first_name: firstName,
        last_name: lastName,
        username,
        email,
        password: encryptedPassword,
        phone,
        position,
        role,
        status,
      };

      const user = await this.prisma.employeeInfo.create({
        data: userBodyRequest,
      });

      delete user.password;

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
