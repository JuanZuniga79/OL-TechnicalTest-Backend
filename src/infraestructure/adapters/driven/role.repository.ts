import IRoleRepository from "@/infraestructure/adapters/driven/interfaces/IRoleRepository";
import RoleEntity from "@/infraestructure/entities/role.entity";
import { PrismaClient } from "@prisma/client";
import {NotFoundException} from "@nestjs/common";

export class RoleRepository implements IRoleRepository {

    private prisma = new PrismaClient();
    private static instance: IRoleRepository;

    private constructor() {}

    static getInstance(): IRoleRepository {
        if (!RoleRepository.instance) {
            RoleRepository.instance = new RoleRepository();
        }
        return RoleRepository.instance;
    }

    async findRoleByName(name: string): Promise<RoleEntity> {
        return this.prisma.roles.findUnique({where: {name}})
            .then((roleEntity) => {
                if (!roleEntity) throw new NotFoundException("Role does not exist");
                return roleEntity;
            }).catch((err) => {
                throw new NotFoundException(err);
            })
    }

}