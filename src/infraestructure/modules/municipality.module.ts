import {Module} from "@nestjs/common";
import {MunicipalityController} from "@/infraestructure/adapters/driving/municipality.controller";
import MunicipalitiesService from "@/application/services/municipality.service";

@Module({
    imports: [],
    controllers: [MunicipalityController],
    providers: [MunicipalitiesService],
})
export class MunicipalityModule {}