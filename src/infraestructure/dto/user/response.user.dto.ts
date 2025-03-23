import {ApiProperty} from "@nestjs/swagger";

export default class UserResponseDto {

    constructor(id: number, role: string, email: string, name?: string) {
        this.id = id;
        this.role = role;
        this.email = email;
        if(name) this.name = name;
    }

    @ApiProperty({
        description: 'user unique identification',
        example: 'string',
    })
    id: number;
    @ApiProperty({
        description: 'user name, controller response is not null',
        example: 'string',
    })
    name: string | null;
    @ApiProperty({
        description: 'role name',
        example: 'string',
    })
    role: string;
    @ApiProperty({
        description: 'user email',
        example: 'string',
    })
    email: string;
}