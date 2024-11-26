import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreatePhishingDto {
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsNotEmpty({ message: 'User ID is required' })
  userId: string;
}