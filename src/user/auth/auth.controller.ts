import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto, SingupDto } from '../dtos/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(`/signup`)
  signup(@Body() body: SingupDto) {
    return this.authService.signup(body);
  }

  @Post(`/signin`)
  signin(@Body() body: SigninDto) {
    return this.authService.signin(body);
  }

}
