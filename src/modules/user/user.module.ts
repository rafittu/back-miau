import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CreateAdminUserService } from './services/admin-user.service';
import { UserRepository } from './repository/user.repository';
import { PrismaService } from 'src/prisma.service';
import { CreateEmployeeUserService } from './services/employee-user.service';

@Module({
  controllers: [UserController],
  providers: [
    PrismaService,
    UserRepository,
    CreateAdminUserService,
    CreateEmployeeUserService,
  ],
})
export class UserModule {}
