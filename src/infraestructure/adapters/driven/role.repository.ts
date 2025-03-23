import IRoleRepository from "@/infraestructure/adapters/driven/interfaces/IRoleRepository";
import RoleEntity from "@/infraestructure/entities/role.entity";
import {Injectable, NotFoundException} from "@nestjs/common";
import {PrismaService} from "@/infraestructure/config/prisma/prisma.service";

@Injectable()
export class RoleRepository implements IRoleRepository {

    constructor(private readonly prisma: PrismaService) {
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