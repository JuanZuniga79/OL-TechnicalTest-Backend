import {Body, Controller, HttpCode, HttpStatus, Post, Res} from "@nestjs/common";
import LoginUserDto from "../../dto/user/login.user.dto";
import AuthService from "@/application/services/auth.service";
import {Response} from "express";
import IResponse from "@/infraestructure/dto/Response";

@Controller('users')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @HttpCode(HttpStatus.BAD_REQUEST)
    async login(@Body() user: LoginUserDto, @Res() r: Response){
        try {
            const token = await this.authService.signIn(user);
            return r.status(HttpStatus.OK).json({
                message: "Authentication successful",
                data: token.access_token
            } as IResponse<string>)
        }catch (error){
            r.status(HttpStatus.BAD_REQUEST).json({
                message: error.message,
                data: null,
            } as IResponse<null>)
        }
    }
}