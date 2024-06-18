import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters,
} from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { HttpExceptionFilter } from '../../common/filter/http-exception.filter';
import { AppError } from '../../common/errors/Error';
import { CreateAdminService } from './services/admin-user.service';
import { ICreateEmployee } from './interfaces/employee.interface';

@Controller('employee')
@UseFilters(new HttpExceptionFilter(new AppError()))
export class EmployeeController {
  constructor(private readonly adminEmployeeService: CreateAdminService) {}

  @Post('/admin')
  createAdmin(
    @Body() createEmployeeDto: CreateEmployeeDto,
  ): Promise<ICreateEmployee> {
    return this.adminEmployeeService.execute(createEmployeeDto);
  }

  @Get()
  findAll() {
    return 'this.employeeService.findAll()';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `this.employeeService.findOne(${+id})`;
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return `this.employeeService.update(${updateEmployeeDto})`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `this.employeeService.remove(${+id})`;
  }
}
