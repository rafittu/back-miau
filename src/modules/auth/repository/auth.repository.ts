import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import * as bcrypt from 'bcrypt';
import { AppError } from '../../../common/errors/Error';
import { CredentialsDto } from '../dto/credentials.dto';
import { IAuthRepository } from '../interfaces/repository.interface';
import { UserPayload } from '../interfaces/services.interface';

@Injectable()
export class AuthRepository implements IAuthRepository {
  constructor(private prisma: PrismaService) {}

  async validateUser(credentials: CredentialsDto): Promise<UserPayload> {
    const { email, password } = credentials;

    const userData = await this.prisma.employeeInfo.findFirst({
      where: {
        email,
      },
      select: {
        id: true,
        username: true,
        role: true,
        password: true,
      },
    });

    if (userData) {
      const isPasswordValid = await bcrypt.compare(password, userData.password);

      if (isPasswordValid) {
        return {
          id: userData.id,
          username: userData.username,
          role: userData.role,
        };
      }
    }

    throw new AppError(
      'auth-repository.validateUser',
      401,
      'email or password is invalid',
    );
  }
}
