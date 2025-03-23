import CountryEntity from "@/infraestructure/entities/country.entity";
import MunicipalityEntity from "@/infraestructure/entities/municipality.entity";

export default interface IMunicipalityRepository {
    findAllCountries(): Promise<CountryEntity[]>;
    findCountryByName(name: string): Promise<CountryEntity>;
    findAllMunicipality(): Promise<MunicipalityEntity[]>;
    findMunicipalityByName(name: string, country_id: number): Promise<MunicipalityEntity>;
    findAllMunicipalityByCountry(country_id: number): Promise<MunicipalityEntity[]>;
}