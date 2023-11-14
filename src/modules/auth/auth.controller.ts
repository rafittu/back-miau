import {
  Controller,
  Post,
  Request,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { AppError } from '../../common/errors/Error';
import { HttpExceptionFilter } from '../../common/filter/http-exception.filter';
import { isPublic } from './infra/decorators/is-public.decorator';
import { SignInService } from './services/signin.service';
import { AuthRequest, UserToken } from './interfaces/services.interface';
import { LocalAuthGuard } from './infra/guards/local-auth.guard';

@Controller('auth')
@UseFilters(new HttpExceptionFilter(new AppError()))
export class AuthController {
  constructor(private readonly signInService: SignInService) {}

  @isPublic()
  @Post('/signin')
  @UseGuards(LocalAuthGuard)
  signIn(@Request() req: AuthRequest): UserToken {
    const { user } = req;
    return this.signInService.execute(user);
  }
}
