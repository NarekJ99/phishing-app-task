import { IsEmail, IsNotEmpty } from 'class-validator';

export class PhishingClickDto {
    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;
}