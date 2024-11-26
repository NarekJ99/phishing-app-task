import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class UserAuthDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
