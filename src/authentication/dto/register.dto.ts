import { PartialType } from '@nestjs/swagger';
import { LogInDto } from './login.dto';

export class RegisterDto {
    email: string;
    name: string;
    password: string;
}
