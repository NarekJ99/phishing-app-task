import { IsNotEmpty, IsEmail } from "class-validator";

export class SendEmailDto {
    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;
}