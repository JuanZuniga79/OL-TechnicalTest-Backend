import {Module} from "@nestjs/common";
import {MunicipalityController} from "../adapters/driving/municipality.controller";
import MunicipalitiesService from "../../application/services/municipality.service";
import {PrismaModule} from "../config/prisma/prisma.module";
import {MunicipalityRepository} from "../adapters/driven/municipality.repository";

@Module({
    imports: [PrismaModule],
    controllers: [MunicipalityController],
    providers: [MunicipalityRepository, MunicipalitiesService],
})
export class MunicipalityModule {}