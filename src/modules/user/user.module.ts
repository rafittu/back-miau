import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CreateAdminUserService } from './services/user-admin.service';
import { UserRepository } from './repository/user.repository';

@Module({
  controllers: [UserController],
  providers: [UserRepository, CreateAdminUserService],
})
export class UserModule {}
