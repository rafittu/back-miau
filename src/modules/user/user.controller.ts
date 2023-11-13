import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from '../../common/filter/http-exception.filter';
import { AppError } from '../../common/errors/Error';
import { isPublic } from '../../common/infra/decorators/is-public.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateAdminUserService } from './services/user-admin.service';

@Controller('user')
@UseFilters(new HttpExceptionFilter(new AppError()))
export class UserController {
  constructor(private readonly adminUserService: CreateAdminUserService) {}

  @isPublic()
  @Post('/admin')
  create(@Body() createUserDto: CreateUserDto) {
    return this.adminUserService.execute(createUserDto);
  }

  // @Get()
  // findAll() {
  //   return this.userService.findAll();
  // }
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id);
  // }
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
