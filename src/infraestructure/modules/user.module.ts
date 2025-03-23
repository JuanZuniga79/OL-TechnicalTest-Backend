import {Module} from "@nestjs/common";
import UserService from "@/application/services/user.service";
import {PrismaModule} from "@/infraestructure/config/prisma/prisma.module";
import {UserRepository} from "@/infraestructure/adapters/driven/user.repository";

@Module({
    imports: [PrismaModule],
    controllers: [],
    providers: [UserRepository, UserService],
    exports: [UserRepository, UserService]
})
export class UserModule {}