import {ApiProperty} from "@nestjs/swagger";

export default class LoginUserDto {
    @ApiProperty({
        description: 'email format gmail.com hotmail.com outlook.es, etc.',
        example: 'string',
    })
    email: string;
    @ApiProperty({
        description: 'user password',
        example: 'string',
        minLength: 8,
        maxLength: 16,
    })
    password: string;
}