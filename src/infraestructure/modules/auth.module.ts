import {Module} from "@nestjs/common";
import {AuthController} from "../adapters/driving/auth.controller";
import UserService from "../../application/services/user.service";
import {UserModule} from "./user.module";
import {JwtModule} from "@nestjs/jwt";
import 'dotenv/config'
import AuthService from "../../application/services/auth.service";

@Module({
    imports: [UserModule, JwtModule.register({
        global: true,
        secret: process.env.JWT_SECRET || 'wBRsMcjMZWSEIK2rgllbT3qG9KtN7ofN',
        signOptions: { expiresIn: '1h' }
    })],
    controllers: [AuthController],
    providers: [AuthService, UserService]
})
export class AuthModule {}