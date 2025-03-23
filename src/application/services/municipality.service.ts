import {Injectable} from "@nestjs/common";
import {MunicipalityRepository} from "@/infraestructure/adapters/driven/municipality.repository";
import ResponseCountryDto from "@/infraestructure/dto/municipality/response.country.dto";

@Injectable()
export default class MunicipalitiesService {

    constructor(private readonly municipality_repository: MunicipalityRepository) {
    }

    async getAll(): Promise<ResponseCountryDto[]>{
        const res: ResponseCountryDto[] = [];
        const countries = await this.municipality_repository.findAllCountries();
        for (const country of countries) {
            const item: ResponseCountryDto = {
                id: country.id,
                name: country.name,
                code: country.code,
                municipalities: await this.municipality_repository.findAllMunicipalityByCountry(country.id)
            };
            res.push(item);
        }
        return res;
    }

}