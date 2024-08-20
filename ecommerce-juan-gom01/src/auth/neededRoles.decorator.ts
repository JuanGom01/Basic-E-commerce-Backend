import { SetMetadata } from "@nestjs/common"

export enum UserRole{
    ADMIN = "admin",
    USER = "user",
}

export const RolesDecorator = (...roles: UserRole[]) => SetMetadata("role", roles) 