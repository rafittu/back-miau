import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SignInService {
  constructor(private jwtService: JwtService) {}

  execute(user) {
    const payload = {
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
