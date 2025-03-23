import {Body, Controller, HttpCode, HttpStatus, Post, Res} from "@nestjs/common";
import LoginUserDto from "../../dto/user/login.user.dto";
import AuthService from "@/application/services/auth.service";
import {Response} from "express";

@Controller('users')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @HttpCode(HttpStatus.BAD_REQUEST)
    async login(@Body() user: LoginUserDto){
        return await this.authService.signIn(user);
    }
}