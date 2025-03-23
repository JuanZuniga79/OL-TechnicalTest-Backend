import LoginUserDto from "@/infraestructure/dto/user/login.user.dto";
import UserResponseDto from "@/infraestructure/dto/user/response.user.dto";

export default interface UserPort{
    validateUser(user: LoginUserDto): Promise<UserResponseDto>;
}