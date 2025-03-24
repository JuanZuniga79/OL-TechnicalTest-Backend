import {ApiProperty} from "@nestjs/swagger";
import ResponseEstablishmentDto from "./response.establishment.dto";

export default class ResponseMerchantDto {
    @ApiProperty({
        example: "number"
    })
    id: number;
    name: string;
    email: string | null;
    phone: string | null;
    registered_at: string;
    status: string;
    municipality: string;
    country: string;
    establishments: ResponseEstablishmentDto[]
}

export class FullResponseMerchantDto {
    @ApiProperty({ example: 1, description: 'Unique identifier of the merchant' })
    id: number;
    @ApiProperty({ example: 'merchant1@gmail.com' })
    email: string | null;
    @ApiProperty({ example: '3000000001' })
    phone: string | null;
    @ApiProperty({ example: '2025-03-22T17:54:19.142Z', description: 'Registration date' })
    registered_at: Date;
    @ApiProperty({ example: 'activo' })
    status_name: string;
    @ApiProperty({ example: 'Merchant A' })
    merchant_name: string;
    @ApiProperty({ example: 'Tunja' })
    municipality_name: string;
    @ApiProperty({ example: 'Colombia' })
    country_name: string;
    @ApiProperty({ example: 57 })
    country_code: number;
    @ApiProperty({ example: 'admin@gmail.com', description: 'Email of the user who updated the merchant' })
    updater_email: string;
    @ApiProperty({ example: 'administrador', description: 'Role of the user who updated the merchant' })
    updater_role: string;
    @ApiProperty({ example: 'Admin User', description: 'Name of the user who updated the merchant' })
    updater_name: string;
    @ApiProperty({ example: 3, description: 'Unique identifier of the establishment' })
    establishment_id: number;
    @ApiProperty({ example: 'Establecimiento 3' })
    establishment_name: string;
    @ApiProperty({ example: 8986539.21, description: 'Total income of the establishment' })
    income: number;
    @ApiProperty({ example: 0, description: 'Number of employees' })
    employees: number;
    @ApiProperty({ example: '2025-03-22T17:54:19.161Z', description: 'Last update timestamp' })
    updated_at: Date;
    @ApiProperty({ example: 'adminemail1@gmail.com', description: 'Email of the user who manages the establishment' })
    establishment_user_email: string;
    @ApiProperty({ example: 'Admin', description: 'Name of the user who manages the establishment' })
    establishment_user_subject_name: string;
    @ApiProperty({ example: 'administrador', description: 'Role of the user who manages the establishment' })
    establishment_user_role: string;
}