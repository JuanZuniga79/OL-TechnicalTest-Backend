import {Module} from "@nestjs/common";
import {PrismaModule} from "../config/prisma/prisma.module";
import {MerchantsController} from "../adapters/driving/merchants.controller";
import MerchantRepository from "../adapters/driven/merchant.repository";
import {MerchantsService} from "../../application/services/merchants.service";
import UserService from "../../application/services/user.service";
import {UserModule} from "./user.module";

@Module({
    imports: [PrismaModule, UserModule],
    controllers: [MerchantsController],
    providers: [MerchantRepository, MerchantsService, UserService],
})
export class MerchantsModule {}