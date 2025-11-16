import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class RoleGuard implements CanActivate {
    private readonly allowedRoles;
    constructor(allowedRoles: string[]);
    canActivate(context: ExecutionContext): boolean;
}
