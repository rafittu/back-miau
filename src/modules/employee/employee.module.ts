import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { PrismaService } from 'src/prisma.service';
import { AlmaService } from 'src/common/api/alma.service';
import { EmployeeRepository } from './repository/employee.repository';
import { CreateAdminService } from './services/admin-user.service';

@Module({
  controllers: [EmployeeController],
  providers: [
    PrismaService,
    AlmaService,
    EmployeeRepository,
    CreateAdminService,
  ],
})
export class EmployeeModule {}
