import {
  Body,
  Controller,
  Logger,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { AuthenticationService } from './authentication.service';
import { ResponseInterceptor } from 'src/interceptors/response.interceptor';
import { RefreshTokenDto } from './dto/refreshToken.dto';

@Controller('authentication')
@UseInterceptors(ResponseInterceptor)
export class AuthenticationController {
  private readonly logger = new Logger(AuthenticationController.name);
  constructor(private readonly authService: AuthenticationService) {}

  @Post('signup')
  signUp(@Body() createUserDto: CreateUserDto) {
    this.logger.log(`Signup endpoint hit for email: ${createUserDto.email}`);
    return this.authService.signUp(createUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    this.logger.log(`Login endpoint hit for email: ${loginUserDto.email}`);
    return this.authService.login(loginUserDto);
  }

  @Post('refresh-token')
  async refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto.refreshToken);
  }
}
