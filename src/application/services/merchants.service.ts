import {BadRequestException, Injectable} from "@nestjs/common";
import MerchantRepository from "../../infraestructure/adapters/driven/merchant.repository";
import MerchantMapper from "../mapper/merchant.mapper";
import CreateMerchantDto from "../../infraestructure/dto/merchant/create.merchant.dto";
import {Validations} from "../../infraestructure/utils/validations.utils";
import ResponseCsvDto from "../../infraestructure/dto/merchant/response.csv.dto";

@Injectable()
export class MerchantsService {
    constructor(private readonly merchant_repository: MerchantRepository) {
    }

    async getMerchants(offset: number, top: number, name?: string, registered_at?: string, status?: string){
        const res =
            await this.merchant_repository
                .getAllMerchantsAndEstablishments(offset, top, name, registered_at, status);
        const formattedData = await MerchantMapper.FullMerchantToResponse(res.data);
        return { total: res.total, data: formattedData };
    }

    async getMerchantById(id: number){
        const res = await this.merchant_repository.findMerchantById(id);
        return MerchantMapper.FullMerchantToResponse(res);
    }

    async createMerchant(createMerchantDto: CreateMerchantDto, creator: number){
        if(createMerchantDto.email && !(Validations.validateEmail(createMerchantDto.email)))
            throw new BadRequestException("Email format ain't valid");
        await this.merchant_repository.createMerchant(createMerchantDto, creator);
    }

    async updateMerchant(id: number, merchant: CreateMerchantDto, updater: number){
        if(merchant.email && !(Validations.validateEmail(merchant.email)))
            throw new BadRequestException("Email format ain't valid");
        await this.merchant_repository.updateMerchant(id, merchant, updater);
    }

    async deleteMerchant(id: number){
        await this.merchant_repository.deleteMerchant(id);
    }

    async changeMerchantStatus(id: number, statusId: number){
        await this.merchant_repository.changeMerchantStatus(id, statusId);
    }

    async getActiveMerchantsWithCalculations(){
        const res = await this.merchant_repository.getAll();
        const formatedData = await MerchantMapper.FullMerchantToResponse(res);
        const items: ResponseCsvDto[] = []
        formatedData.forEach(item => {
            const element: ResponseCsvDto = {
                name: item.name,
                email: item.email || "",
                phone: item.phone || "",
                municipality: item.municipality,
                status: item.status,
                registered_at: item.registered_at,
                no_employees: 0,
                no_establishments: item.establishments.length,
                total_income: 0
            }
            item.establishments.forEach(establishment => {
                element.total_income += establishment.income;
                element.no_employees += establishment.employees;
            })
            items.push(element);
        })
        let csvContent = 'Nombre|Municipio|Teléfono|Correo Electrónico|Fecha de Registro|Estado|Cantidad de Establecimientos|Total Ingresos|Cantidad de Empleados\n';
        items.forEach(item => {
            csvContent += `${item.name}|${item.municipality}|${item.phone}|${item.email}|${item.registered_at}|${item.status}|${item.no_establishments}|${item.total_income}|${item.no_employees}\n`;
        });
        return csvContent;
    }

}