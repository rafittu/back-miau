import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CreateAdminUserService } from './services/user-admin.service';
import { UserRepository } from './repository/user.repository';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [UserController],
  providers: [PrismaService, UserRepository, CreateAdminUserService],
})
export class UserModule {}
