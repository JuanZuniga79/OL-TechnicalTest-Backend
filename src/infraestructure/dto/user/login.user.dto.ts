import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, MaxLength, MinLength} from "class-validator";

export default class LoginUserDto {
    @ApiProperty({
        description: 'Email format (e.g., gmail.com, hotmail.com, outlook.es, etc.).',
        example: 'user@example.com',
    })
    @IsString({message: 'Email must be a string'})
    email: string;

    @ApiProperty({
        description: 'User password (8-16 characters).',
        example: 'encrypted password',
    })
    @IsString({ message: 'Password must be a string' })
    @MinLength(8, { message: 'Password must be at least 8 characters' })
    password: string;
}