import UserPort from "@/application/ports/driving/user.port";
import LoginUserDto from "@/infraestructure/dto/user/login.user.dto";
import {BadRequestException, Injectable} from "@nestjs/common";
import IUserRepository from "@/infraestructure/adapters/driven/interfaces/IUserRepository";
import UserEntity from "@/infraestructure/entities/user.entity";
import {UserRepository} from "@/infraestructure/adapters/driven/user.repository";
import EncryptUtils from "@/infraestructure/utils/encrypt.utils";
import UserResponseDto from "@/infraestructure/dto/user/response.user.dto";
import IRoleRepository from "@/infraestructure/adapters/driven/interfaces/IRoleRepository";
import {RoleRepository} from "@/infraestructure/adapters/driven/role.repository";

@Injectable()
export default class UserService implements UserPort {

    private user_repository: IUserRepository = UserRepository.getInstance();
    private role_repository: IRoleRepository = RoleRepository.getInstance();

    async validateUser(user: LoginUserDto): Promise<UserResponseDto> {
        const userValidated: UserEntity = await this.user_repository.findUserByEmail(user.email)
            .then((res)=> res)
            .catch((err) => {
                throw new BadRequestException('No se pudo encontrar el usuario');
            })
        await EncryptUtils.validatePassword(user.password, userValidated.password);
        const role = await this.role_repository.findRoleByName('administrador');
        return new UserResponseDto(Number(userValidated.id), role.name, user.email, '');
    }

}