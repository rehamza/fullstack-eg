import {
  Body,
  Controller,
  Get,
  Logger,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ResponseInterceptor } from 'src/interceptors/response.interceptor';
import { JwtAuthGuard } from 'src/middlewares/jwtAuth.guard';

@Controller('user')
@UseInterceptors(ResponseInterceptor)
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req) {
    this.logger.log(`Profile endpoint hit ${req.user.userId}`);
    return this.userService.getProfile(req.user.userId);
  }
}
