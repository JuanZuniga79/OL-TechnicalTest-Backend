import {Controller, Get, HttpCode, HttpStatus, Res, UseGuards} from "@nestjs/common";
import {ApiSecurity} from "@nestjs/swagger";
import MunicipalitiesService from "@/application/services/municipality.service";
import {Response} from "express";
import ResponseCountryDto from "@/infraestructure/dto/municipality/response.country.dto";
import {AuthGuard} from "@/infraestructure/guards/auth.guard";

@ApiSecurity('bearer')
@Controller('municipality')
@UseGuards(AuthGuard)
export class MunicipalityController {
    constructor(private readonly municipalityService: MunicipalitiesService) {
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    @HttpCode(HttpStatus.BAD_REQUEST)
    async getAll(@Res() r: Response){
        const data = await this.municipalityService.getAll();
        return r.status(HttpStatus.OK).json(data);
    }

}