import {Injectable} from "@nestjs/common";
import IMerchantsRepository from "./interfaces/IMerchantsRepository";
import {PrismaService} from "../../config/prisma/prisma.service";
import {FullResponseMerchantDto} from "../../dto/merchant/response.merchant.dto";
import ResponsePageableDto from "../../dto/responsePageableDto";
import CreateMerchantDto from "../../dto/merchant/create.merchant.dto";
import {Prisma} from "@prisma/client";

@Injectable()
export default class MerchantRepository implements IMerchantsRepository {
    constructor(private readonly prisma: PrismaService) {
    }

    async getAll(): Promise<FullResponseMerchantDto[]> {
        return this.prisma.$queryRaw<FullResponseMerchantDto[]>`
            SELECT * FROM merchant_view
            WHERE status_name=${"activo"}
            ORDER BY id
        `
    }

    async findMerchantById(merchantId: number): Promise<FullResponseMerchantDto[]> {
        return this.prisma.$queryRaw<FullResponseMerchantDto[]>`
            SELECT *
            FROM merchant_view
            WHERE id=${merchantId}
            ORDER BY establishment_id
        `;
    }

    async createMerchant(merchant: CreateMerchantDto, updater: number): Promise<void> {
        const subject = await this.prisma.subjects.create({
            data: {
                name: merchant.name,
                type: 'M'
            }
        });
        await this.prisma.merchants.create({
            data: {
                email: merchant.email !== "" ? merchant.email : null,
                phone: merchant.phone !== "" ? merchant.phone : null,
                updater_id: updater,
                municipality_id: merchant.municipality_id,
                status_id: merchant.status_id,
                subject_id: subject.id,
                registered_at: new Date(merchant.registered_at),
                establishments: {
                    create: merchant.establishments.map(establishment => ({
                        name: establishment.name,
                        income: establishment.income,
                        employees: establishment.employees,
                        users: { connect: { id: updater } }
                    }))
                }
            }
        });
    }
    async updateMerchant(id: number, merchant: CreateMerchantDto, updater: number): Promise<void> {
        await this.prisma.merchants.update({
            where: { id },
            data: {
                email: merchant.email,
                phone: merchant.phone,
                municipality_id: merchant.municipality_id,
                updated_at: new Date(),
                updater_id: updater,
            }
        });
    }

    async deleteMerchant(merchantId: number): Promise<void> {
        await this.prisma.merchants.delete({
            where: { id: merchantId }
        });
    }

    async changeMerchantStatus(merchantId: number, status_id: number): Promise<void> {
        await this.prisma.merchants.update({
            where: { id: merchantId },
            data: { status_id }
        });
    }

    async getAllMerchantsAndEstablishments(
        offset: number,
        top: number,
        name?: string,
        registered_at?: string,
        status?: string
    ): Promise<ResponsePageableDto<FullResponseMerchantDto[]>> {
        const data = await this.prisma
          .$queryRaw<FullResponseMerchantDto[]>(
              Prisma.sql`
            WITH merchant_list AS (
                SELECT DISTINCT ON (id) id
                FROM merchant_view
                WHERE 
                    (${name ? Prisma.sql`LOWER(merchant_name) LIKE LOWER(${`%${name}%`})` : Prisma.sql`TRUE`})
                    AND (${registered_at ? Prisma.sql`DATE(registered_at) = ${new Date(registered_at)}` : Prisma.sql`TRUE`})
                    AND (${status ? Prisma.sql`status_id = ${parseInt(status)}` : Prisma.sql`TRUE`})
                ORDER BY id
                LIMIT ${top} OFFSET ${offset}
            )
            SELECT mv.*
            FROM merchant_view mv
            JOIN merchant_list ml ON mv.id = ml.id
            ORDER BY mv.id;
            `);
        const total = await this.prisma.merchants.count();

        return {
            data: data,
            total: Number(total)
        };
    }

}