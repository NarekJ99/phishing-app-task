import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from '../schemas/User.model';
import { UserAuthDto } from './dto/userAuthDto.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) 
    private readonly userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async create(userData: UserAuthDto): Promise<{  user: Omit<User, 'password'>; token: string }> {
    try{

      const { password, email } = userData;
      
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      
      const user = new this.userModel({ email, password: hashedPassword });
      const savedUser = await user.save();
      
      const { password: _, ...userWithoutPassword } = savedUser.toObject();

      const token = this.signToken(savedUser._id, savedUser.email);
      
      return { user: userWithoutPassword, token };
    }
    catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Email is already registered');
      }
      throw error;
    }
    }
    
    async login(userData: UserAuthDto): Promise<{ user: Omit<User, 'password'>; token: string }> {
      const { email, password } = userData;
      
      const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const { password: _, ...userWithoutPassword } = user.toObject();

    const token = this.signToken(user._id, user.email);

    return { user: userWithoutPassword, token };
  }

  private signToken(userId: string, email: string): string {
    const payload = { sub: userId, email };
    return this.jwtService.sign(payload);
  }
}
