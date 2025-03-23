import {Module} from "@nestjs/common";
import {PrismaModule} from "@/infraestructure/config/prisma/prisma.module";
import {MerchantsController} from "@/infraestructure/adapters/driving/merchants.controller";
import MerchantRepository from "@/infraestructure/adapters/driven/merchant.repository";
import {MerchantsService} from "@/application/services/merchants.service";
import UserService from "@/application/services/user.service";
import {UserModule} from "@/infraestructure/modules/user.module";

@Module({
    imports: [PrismaModule, UserModule],
    controllers: [MerchantsController],
    providers: [MerchantRepository, MerchantsService, UserService],
})
export class MerchantsModule {}