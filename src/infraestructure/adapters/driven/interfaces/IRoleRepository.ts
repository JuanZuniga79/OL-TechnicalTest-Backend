import RoleEntity from "../../../../infraestructure/entities/role.entity";

export default interface IRoleRepository{
    findRoleByName(name: string): Promise<RoleEntity>;
}