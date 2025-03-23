import {Module} from "@nestjs/common";
import UserService from "@/application/services/user.service";
import {UserRepository} from "@/infraestructure/adapters/driven/user.repository";

@Module({
    imports: [],
    controllers: [],
    providers: [UserService]
})
export class UserModule {}