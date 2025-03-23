import {Injectable} from "@nestjs/common";
import IMerchantsRepository from "@/infraestructure/adapters/driven/interfaces/IMerchantsRepository";
import {PrismaService} from "@/infraestructure/config/prisma/prisma.service";
import {FullResponseMerchantDto} from "@/infraestructure/dto/merchant/response.merchant.dto";
import ResponsePageableDto from "@/infraestructure/dto/responsePageableDto";
import CreateMerchantDto from "@/infraestructure/dto/merchant/create.merchant.dto";
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
                email: merchant.email,
                phone: merchant.phone,
                updater_id: updater,
                municipality_id: merchant.municipality_id,
                status_id: 1,
                subject_id: subject.id,
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
        const [data, total] = await this.prisma.$transaction([
            this.prisma.$queryRaw<FullResponseMerchantDto[]>(
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
            `
            ),
            this.prisma.$queryRaw<{ count: number }[]>(
                Prisma.sql`
            SELECT COUNT(*) as count 
            FROM merchant_view
            WHERE 
                (${name ? Prisma.sql`LOWER(merchant_name) LIKE LOWER(${`%${name}%`})` : Prisma.sql`TRUE`})
                AND (${registered_at ? Prisma.sql`DATE(registered_at) = ${new Date(registered_at)}` : Prisma.sql`TRUE`})
                AND (${status ? Prisma.sql`status_id = ${parseInt(status)}` : Prisma.sql`TRUE`});
            `
            )
        ]);

        return {
            data: data,
            total: Number(total[0].count)
        };
    }

}