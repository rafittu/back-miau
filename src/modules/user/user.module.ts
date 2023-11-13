import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CreateAdminUserService } from './services/user-admin.service';

@Module({
  controllers: [UserController],
  providers: [CreateAdminUserService],
})
export class UserModule {}
