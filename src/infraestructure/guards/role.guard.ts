import {Injectable, CanActivate, ExecutionContext, ForbiddenException, UnauthorizedException} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '@/infraestructure/config/roles.decorator';
import EncryptUtils from "@/infraestructure/utils/encrypt.utils";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());
        if (!requiredRoles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user;

        if(!user) throw new UnauthorizedException("No tiene permisos para realizar esta accion");

        let found:boolean = false;
        
        for (const role of requiredRoles) {
            if(EncryptUtils.validateWithResponse(role, user.role)){
                found = true;
                break;
            }
        }

        return found;
    }
}
