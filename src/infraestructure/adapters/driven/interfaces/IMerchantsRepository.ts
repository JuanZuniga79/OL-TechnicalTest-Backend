import {FullResponseMerchantDto} from "../../../dto/merchant/response.merchant.dto";
import ResponsePageableDto from "../../../../infraestructure/dto/responsePageableDto";
import CreateMerchantDto from "../../../../infraestructure/dto/merchant/create.merchant.dto";

export default interface IMerchantsRepository {
    findMerchantById(merchantId: number): Promise<FullResponseMerchantDto[]>
    createMerchant(merchant: CreateMerchantDto, updater: number): Promise<void>
    updateMerchant(id: number, merchant: CreateMerchantDto, updater: number): Promise<void>
    deleteMerchant(merchantId: number): Promise<void>
    changeMerchantStatus(merchant: number, status_id: number): Promise<void>
    getAllMerchantsAndEstablishments(offset: number, top: number, name?: string, registered_at?: string,
        status?: string): Promise<ResponsePageableDto<FullResponseMerchantDto[]>>
    getAll(): Promise<FullResponseMerchantDto[]>;
}