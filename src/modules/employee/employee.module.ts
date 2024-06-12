import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [EmployeeController],
  providers: [PrismaService],
})
export class EmployeeModule {}
