import IMunicipalityRepository from "@/infraestructure/adapters/driven/interfaces/IMunicipalityRepository";
import CountryEntity from "@/infraestructure/entities/country.entity";
import MunicipalityEntity from "@/infraestructure/entities/municipality.entity";
import {PrismaClient} from "@prisma/client";
import {NotFoundException} from "@nestjs/common";

export class MunicipalityRepository implements IMunicipalityRepository {

    private prisma = new PrismaClient();
    private static instance: IMunicipalityRepository;

    private constructor() {}

    static getInstance(): IMunicipalityRepository {
        if(!MunicipalityRepository.instance) {
            MunicipalityRepository.instance = new MunicipalityRepository();
        }
        return MunicipalityRepository.instance;
    }

    async findAllCountries(): Promise<CountryEntity[]> {
        const data = await this.prisma.countries.findMany();
        if(!data) throw new NotFoundException("No countries found");
        return data;
    }
    async findCountryByName(name: string): Promise<CountryEntity> {
        const res = await this.prisma.countries.findUnique({ where: { name } });
        if(!res) throw new NotFoundException("No countries found");
        return res;
    }
    async findAllMunicipality(): Promise<MunicipalityEntity[]> {
        const data = await this.prisma.municipalities.findMany();
        if(!data) throw new NotFoundException("No municipalities found");
        return data;
    }
    async findMunicipalityByName(name: string, country: number): Promise<MunicipalityEntity> {
        const res = await this.prisma.municipalities
            .findFirst({where : {country_id: country, name}})

        if(!res) throw new NotFoundException("No municipalities found");
        return res;
    }

    async findAllMunicipalityByCountry(country_id: number): Promise<MunicipalityEntity[]> {
        return this.prisma.municipalities
            .findMany({where: {country_id}});
    }

}