import { Injectable, Logger, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async getProfile(userId: string): Promise<any> {
    try {
      this.logger.log(`Attempting to get profile data for user with ID: ${userId}`);
      const user = await this.userModel.findById(userId).select('-password');

      if (!user) {
        this.logger.error(`User with ID: ${userId} not found`);
        throw new NotFoundException('User not found');
      }

      this.logger.log(`Successfully retrieved profile data for user with ID: ${userId}`);
      return user;
    } catch (error) {
      this.logger.error(`Failed to retrieve profile data for user with ID: ${userId}`, error.stack);
      throw new InternalServerErrorException('Error occurred while fetching profile data');
    }
  }
}
