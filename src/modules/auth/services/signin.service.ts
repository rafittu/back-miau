import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  JtwPayload,
  UserPayload,
  UserToken,
} from '../interfaces/services.interface';

@Injectable()
export class SignInService {
  constructor(private jwtService: JwtService) {}

  execute(user: UserPayload): UserToken {
    const payload: JtwPayload = {
      sub: user.id,
      username: user.username,
      role: user.role,
    };

    const jwtToken = this.jwtService.sign(payload);

    return {
      accessToken: jwtToken,
    };
  }
}
