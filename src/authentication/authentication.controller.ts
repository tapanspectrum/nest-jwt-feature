import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { LogInDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post()
  create(@Body() createAuthenticationDto: LogInDto) {
    return true;
    // return this.authenticationService.create(createAuthenticationDto);
  }

  @Get()
  findAll() {
    // return this.authenticationService.findAll();
    return true;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // return this.authenticationService.findOne(+id);
    return true;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthenticationDto: RegisterDto) {
    // return this.authenticationService.update(+id, updateAuthenticationDto);
    return true;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // return this.authenticationService.remove(+id);
    return true;
  }
}
