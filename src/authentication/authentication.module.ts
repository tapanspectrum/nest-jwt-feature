import { Module } from '@nestjs/common';

import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { LocalStrategy } from './strategies/local.startegy';


import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { UsersModule } from 'src/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports:[
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: process.env.JWT_SECRET_KEY,
        signOptions: { expiresIn: '60s' },
      }),
    }),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, LocalStrategy, JwtStrategy],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
