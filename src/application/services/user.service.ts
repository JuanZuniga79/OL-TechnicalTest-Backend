import LoginUserDto from "../../infraestructure/dto/user/login.user.dto";
import {BadRequestException, Injectable} from "@nestjs/common";
import UserEntity from "../../infraestructure/entities/user.entity";
import {UserRepository} from "../../infraestructure/adapters/driven/user.repository";
import EncryptUtils from "../../infraestructure/utils/encrypt.utils";
import UserResponseDto from "../../infraestructure/dto/user/response.user.dto";
import {RoleRepository} from "../../infraestructure/adapters/driven/role.repository";
import * as CryptoJS from "crypto-js";
import 'dotenv/config'

@Injectable()
export default class UserService {

    constructor(private readonly user_repository: UserRepository, private readonly role_repository: RoleRepository) {
    }

    decrypt(encrypted: string): string {
        try {
            const secretKey = process.env.SECRET_KEY || "";
            const bytes = CryptoJS.AES.decrypt(encrypted, secretKey);
            return bytes.toString(CryptoJS.enc.Utf8);
        }catch(err) {
            console.log(err);
            return ''
        }
    }

    async validateUser(userCredentials: LoginUserDto): Promise<UserResponseDto> {
        const email = this.decrypt(userCredentials.email);
        const {user, password} = await this.user_repository.getUserResponseByEmail(email);
        if(!user) throw new BadRequestException("Invalid email or password");
        const pass = this.decrypt(userCredentials.password);
        await EncryptUtils.validatePassword(pass, password);
        const role = await this.role_repository.findRoleByName('administrador');
        return user;
    }

    async getUserById(id: number): Promise<UserEntity> {
        return this.user_repository.findUserById(id);
    }

}