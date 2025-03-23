import {ApiProperty} from "@nestjs/swagger";

export default class ResponseMunicipalityDto {
    @ApiProperty({
        example: "number",
    })
    id: number;
    @ApiProperty({
        example: "string",
    })
    name: string;
}