import {Module} from "@nestjs/common";
import UserService from "@/application/services/user.service";
import {PrismaModule} from "@/infraestructure/config/prisma/prisma.module";
import {UserRepository} from "@/infraestructure/adapters/driven/user.repository";
import {RoleRepository} from "@/infraestructure/adapters/driven/role.repository";

@Module({
    imports: [PrismaModule],
    controllers: [],
    providers: [UserRepository, RoleRepository, UserService,],
    exports: [UserRepository, RoleRepository, UserService]
})
export class UserModule {}