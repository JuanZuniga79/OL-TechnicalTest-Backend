import { PrismaClient } from '@prisma/client'
import {Validations} from "../../utils/validations.utils";
import {BadRequestException, Injectable, NotFoundException, UnauthorizedException} from "@nestjs/common";
import IUserRepository from "./interfaces/IUserRepository";
import UserEntity from "../../entities/user.entity";
import {PrismaService} from "../../config/prisma/prisma.service";
import UserResponseDto from '../../dto/user/response.user.dto';

@Injectable()
export class UserRepository implements IUserRepository{

    constructor(private readonly prisma: PrismaService) {}

    async findUserById(id: number): Promise<UserEntity> {
        const result = await this.prisma.users.findUnique({where: {id}})
        if(!result) throw new UnauthorizedException(`User with id ${id} not found`)
        return result
    }

    async getUserResponseByEmail(email: string): Promise<{
        user: UserResponseDto,
        password: string
    }> {
        if(!Validations.validateEmail(email))
            throw new BadRequestException("El email no posee la estructura correcta")
        const result =
          await this.prisma.users.findUnique({
              select: {
                  id: true,
                  email: true,
                  roles: {
                    select: {
                        name: true,
                    }
                  },
                  subjects: {
                      select: {
                          name: true,
                      }
                  },
                  password: true
              },
              where: {email}
          })
        if(!result) throw new UnauthorizedException(`User with email ${email} not found`)
        return {
            user: {
                id: Number(result.id), email: result.email, name: result.subjects.name,
                role: result.roles.name,
            } as UserResponseDto,
            password: result.password,
        }
    }

    async findUserByEmail(email: string): Promise<UserEntity> {
        if(!Validations.validateEmail(email)){
            throw new BadRequestException('El email no posee la estructura correcta')
        }
        const result = await this.prisma.users.findUnique({ where: { email } });
        if (!result) throw new BadRequestException('El usuario no existe');
        return result;
    }

}