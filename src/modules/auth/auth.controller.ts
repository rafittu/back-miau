import { Controller, Post, Request, UseFilters } from '@nestjs/common';
import { AppError } from '../../common/errors/Error';
import { HttpExceptionFilter } from '../../common/filter/http-exception.filter';
import { isPublic } from '../../common/infra/decorators/is-public.decorator';
import { SignInService } from './services/signin.service';

@Controller('auth')
@UseFilters(new HttpExceptionFilter(new AppError()))
export class AuthController {
  constructor(private readonly signInService: SignInService) {}

  @isPublic()
  @Post('/signin')
  signIn(@Request() req) {
    const { user } = req;
    return this.signInService.execute(user);
  }
}
