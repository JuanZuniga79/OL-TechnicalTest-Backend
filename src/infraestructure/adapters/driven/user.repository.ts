import { PrismaClient } from '@prisma/client'
import {Validations} from "../../utils/validations.utils";
import {BadRequestException, Injectable} from "@nestjs/common";
import IUserRepository from "./interfaces/IUserRepository";
import UserEntity from "../../entities/user.entity";

export class UserRepository implements IUserRepository{

    private prisma = new PrismaClient()
    private static instance: IUserRepository;

    private constructor() {}

    static getInstance(): IUserRepository {
        if (!UserRepository.instance) {
            UserRepository.instance = new UserRepository();
        }
        return UserRepository.instance;
    }

    async findUserByEmail(email: string): Promise<UserEntity> {
        if(!Validations.validateEmail(email)){
            throw new BadRequestException('El email no posee la estructura correcta')
        }
        return this.prisma.users.findUnique({where:{email}})
            .then((result) => {
                if(!result) throw new BadRequestException('el usuario no existe')
                return result
            })
            .catch((err)=>{throw new BadRequestException(err)})
    }

}