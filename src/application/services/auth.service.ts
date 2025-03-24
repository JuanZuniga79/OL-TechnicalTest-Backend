import {Injectable} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import LoginUserDto from "../../infraestructure/dto/user/login.user.dto";
import UserService from "../services/user.service";
import EncryptUtils from "../../infraestructure/utils/encrypt.utils";

@Injectable()
export default class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) {
    }

    async signIn(user: LoginUserDto): Promise<{ access_token: string }> {
        const validated = await this.userService.validateUser(user);
        const role = await EncryptUtils.encryptPassword(validated.role);
        const payload = { sub: Number(validated.id), role };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}