import ResponseMerchantDto, {FullResponseMerchantDto} from "../../infraestructure/dto/merchant/response.merchant.dto";

export default class MerchantMapper {
    static async FullMerchantToResponse(items: FullResponseMerchantDto[]): Promise<ResponseMerchantDto[]>{
        const response: ResponseMerchantDto[] = []
        let lastId = 0;
        let workingIndex = 0;
        items.sort((a, b) => Number(a.id) - Number(b.id))
            .forEach((item) => {
                const id = Number(item.id);
                if(lastId !== id){
                    lastId = id;
                    if(response.length > 0){
                        workingIndex += 1;
                    }
                }
                if(!response[workingIndex]){
                    response.push({
                        id,
                        name: item.merchant_name,
                        status: item.status_name,
                        phone: item.phone,
                        email: item.email,
                        country: item.country_name,
                        municipality: item.municipality_name,
                        registered_at: new Date(item.registered_at).toISOString(),
                        establishments: [
                            {
                                id: Number(item.establishment_id),
                                name: item.establishment_name,
                                income: item.income,
                                employees: item.employees,
                            }
                        ]
                    })
                }else{
                    response[workingIndex].establishments.push({
                        id: Number(item.establishment_id),
                        name: item.establishment_name,
                        income: item.income,
                        employees: item.employees,
                    })
                }
            })
        return response;
    }
}