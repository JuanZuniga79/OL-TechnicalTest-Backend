import {Module} from "@nestjs/common";
import {MunicipalityController} from "@/infraestructure/adapters/driving/municipality.controller";
import MunicipalitiesService from "@/application/services/municipality.service";
import {PrismaModule} from "@/infraestructure/config/prisma/prisma.module";
import {MunicipalityRepository} from "@/infraestructure/adapters/driven/municipality.repository";

@Module({
    imports: [PrismaModule],
    controllers: [MunicipalityController],
    providers: [MunicipalityRepository, MunicipalitiesService],
})
export class MunicipalityModule {}