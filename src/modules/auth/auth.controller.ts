import { Controller, Post, Request, UseFilters } from '@nestjs/common';
import { AppError } from '../../common/errors/Error';
import { HttpExceptionFilter } from '../../common/filter/http-exception.filter';
import { isPublic } from '../../common/infra/decorators/is-public.decorator';
import { SignInService } from './services/signin.service';
import { AuthRequest, UserToken } from './interfaces/services.interface';

@Controller('auth')
@UseFilters(new HttpExceptionFilter(new AppError()))
export class AuthController {
  constructor(private readonly signInService: SignInService) {}

  @isPublic()
  @Post('/signin')
  signIn(@Request() req: AuthRequest): UserToken {
    const { user } = req;
    return this.signInService.execute(user);
  }
}
