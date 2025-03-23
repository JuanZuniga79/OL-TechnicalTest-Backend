import LoginUserDto from "@/infraestructure/dto/user/login.user.dto";
import {BadRequestException, Injectable} from "@nestjs/common";
import UserEntity from "@/infraestructure/entities/user.entity";
import {UserRepository} from "@/infraestructure/adapters/driven/user.repository";
import EncryptUtils from "@/infraestructure/utils/encrypt.utils";
import UserResponseDto from "@/infraestructure/dto/user/response.user.dto";
import IRoleRepository from "@/infraestructure/adapters/driven/interfaces/IRoleRepository";
import {RoleRepository} from "@/infraestructure/adapters/driven/role.repository";

@Injectable()
export default class UserService {

    constructor(private readonly user_repository: UserRepository) {
    }

    private role_repository: IRoleRepository = RoleRepository.getInstance();

    async validateUser(user: LoginUserDto): Promise<UserResponseDto> {
        const userValidated: UserEntity = await this.user_repository.findUserByEmail(user.email)
        if(!userValidated) throw new BadRequestException("Invalid email or password");
        await EncryptUtils.validatePassword(user.password, userValidated.password);
        const role = await this.role_repository.findRoleByName('administrador');
        return new UserResponseDto(Number(userValidated.id), role.name, user.email, '');
    }

}