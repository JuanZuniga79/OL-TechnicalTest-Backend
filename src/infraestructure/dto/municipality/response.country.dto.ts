import {ApiProperty} from "@nestjs/swagger";
import ResponseMunicipalityDto from "@/infraestructure/dto/municipality/response.municipality.dto";

export default class ResponseCountryDto{
    @ApiProperty({
        description: 'Country unique identification',
        example: "number"
    })
    id: number;
    @ApiProperty({
        description: 'Country unique name',
        example: 'string',
    })
    name: string;
    @ApiProperty({
        description: "Country unique code",
        example: "number",
    })
    code: number;
    @ApiProperty({
        example: "list",
    })
    municipalities: ResponseMunicipalityDto[]
}