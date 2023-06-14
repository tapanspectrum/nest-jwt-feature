import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthenticationService } from './../authentication.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthenticationService) {
    super({
      usernameField: 'email'
    });
  }

  async validate(email: string, password: string): Promise<any> {
    // console.log(username);
    console.log(password);
    const user = await this.authService.getAuthenticatedUser(email, password);
    console.log('local s', user);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}