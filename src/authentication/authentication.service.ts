import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import {RegisterDto} from './dto/register.dto';
import * as bcrypt from 'bcrypt';
// import PostgresErrorCode from '../database/postgresErrorCode.enum';
import { JwtService } from '@nestjs/jwt';
import {TokenPayload} from './interfaces/tokenpayload.interface';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthenticationService {
  constructor(
    @Inject(UsersService) private readonly usersService: UsersService,
    private  jwtService: JwtService
  ) {}

  public async register(registrationData: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registrationData.password, 10);
    console.log(registrationData);
    console.log(hashedPassword);
    try {
      const createdUser = await this.usersService.create({
        ...registrationData,
        password: hashedPassword
      });
      console.log(createdUser);
      createdUser.password = undefined;
      return createdUser;
    } catch (error) {
      console.log(error);
      if (error?.code === 2001) {
        throw new HttpException('User witha that email already exists', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async getCookieWithJwtToken(userId: number) {
    const payload: TokenPayload = { userId };
    console.log('payload', payload);
    const token = await this.jwtService.signAsync(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${process.env.JWT_EXPIRATION_TIME}`;
  }

  public getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }

  public async getAuthenticatedUser(email: string, plainTextPassword: string) {
    try {
      console.log('Hi');
      const user = await this.usersService.getByEmail(email);
      console.log(user);
      await this.verifyPassword(plainTextPassword, user.password);
      return user;
    } catch (error) {
      throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
    }
  }

  private async verifyPassword(plainTextPassword: string, hashedPassword: string) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword
    );
    if (!isPasswordMatching) {
      throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
    }
  }
}