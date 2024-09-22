import {
    Injectable,
    Logger,
    UnauthorizedException,
    InternalServerErrorException,
  } from '@nestjs/common';
  import { InjectModel } from '@nestjs/mongoose';
  import { Model } from 'mongoose';
  import { User, UserDocument } from '../schemas/user.schema';
  import { CreateUserDto } from './dto/createUser.dto';
  import { LoginUserDto } from './dto/loginUser.dto';
  import * as bcrypt from 'bcryptjs';
  import { JwtService } from '@nestjs/jwt';
  import { ConfigService } from '@nestjs/config';
  
  @Injectable()
  export class AuthenticationService {
    private readonly logger = new Logger(AuthenticationService.name);
  
    constructor(
      @InjectModel(User.name) private userModel: Model<UserDocument>,
      private jwtService: JwtService,
      private configService: ConfigService,
    ) {}
  
    async signUp(createUserDto: CreateUserDto): Promise<any> {
      try {
        this.logger.log(
          `Attempting to sign up user with email: ${createUserDto.email}`,
        );
        const { name, email, password } = createUserDto;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new this.userModel({
          name,
          email,
          password: hashedPassword,
        });
        await user.save();
        this.logger.log(`User created with email: ${createUserDto.email}`);
        return this.createTokens(user);
      } catch (error) {
        this.logger.error(
          `Failed to sign up user with email: ${createUserDto.email}`,
          error.stack,
        );
        throw new InternalServerErrorException('Error occurred during sign-up');
      }
    }
  
    async login(loginUserDto: LoginUserDto): Promise<any> {
      try {
        this.logger.log(`User login attempt with email: ${loginUserDto.email}`);
        const { email, password } = loginUserDto;
        const user = await this.userModel.findOne({ email });
  
        if (!user || !(await bcrypt.compare(password, user.password))) {
          this.logger.error(
            `Invalid login attempt for email: ${loginUserDto.email}`,
          );
          throw new UnauthorizedException('Invalid credentials');
        }
  
        this.logger.log(
          `User successfully logged in with email: ${loginUserDto.email}`,
        );
        return this.createTokens(user);
      } catch (error) {
        this.logger.error(
          `Failed to login user with email: ${loginUserDto.email}`,
          error.stack,
        );
        if (error instanceof UnauthorizedException) {
          throw error;
        }
        throw new InternalServerErrorException('Error occurred during login');
      }
    }
  
    private createTokens(user: UserDocument) {
      const payload = { email: user.email, sub: user._id };
      
      const accessToken = this.jwtService.sign(payload, {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: this.configService.get<number>('JWT_EXPIRATION') || 3600,
      });
      
      const refreshToken = this.jwtService.sign(payload, {
        secret: this.configService.get<string>('REFRESH_SECRET'), 
        expiresIn: this.configService.get<number>('REFRESH_EXPIRATION') || 86400
      });
  
      this.logger.log(`Tokens generated for user with email: ${user.email}`);
      return { accessToken, refreshToken };
    }

    async refreshToken(refreshToken: string): Promise<any> {
        try {
          const payload = this.jwtService.verify(refreshToken, {
            secret: this.configService.get<string>('REFRESH_SECRET'),
          });
          const user = await this.userModel.findById(payload.sub);
          if (!user) {
            throw new UnauthorizedException('Invalid refresh token');
          }
    
          return this.createTokens(user);
        } catch (error) {
          this.logger.error('Failed to refresh token', error.stack);
          throw new UnauthorizedException('Invalid refresh token');
        }
      }
  }
  