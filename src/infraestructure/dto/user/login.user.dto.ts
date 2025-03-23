import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, MaxLength, MinLength} from "class-validator";

export default class LoginUserDto {
    @ApiProperty({
        description: 'Email format (e.g., gmail.com, hotmail.com, outlook.es, etc.).',
        example: 'user@example.com',
    })
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;

    @ApiProperty({
        description: 'User password (8-16 characters).',
        example: 'StrongPass123',
        minLength: 8,
        maxLength: 16,
    })
    @IsString({ message: 'Password must be a string' })
    @MinLength(8, { message: 'Password must be at least 8 characters' })
    @MaxLength(16, { message: 'Password must not exceed 16 characters' })
    password: string;
}