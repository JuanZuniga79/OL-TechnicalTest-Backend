import UserEntity from "../../../../infraestructure/entities/user.entity";

export default interface IUserRepository {
    findUserByEmail(email: string): Promise<UserEntity>;
    findUserById(id: number): Promise<UserEntity>;
}