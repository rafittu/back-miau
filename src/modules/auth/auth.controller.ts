import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post()
  signIn(@Request() req) {
    return 'return jwt token';
  }
}
