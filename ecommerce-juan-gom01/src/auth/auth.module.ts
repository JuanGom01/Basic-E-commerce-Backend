import { Module } from "@nestjs/common";
import { authService } from "./auth.service";
import { authController } from "./auth.controller";
import { usersRepository } from "src/users/users.repository";
import { userModule } from "src/users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/users/user.entity";
import { Role } from "src/users/roles.entity";




@Module({
    imports: [userModule, TypeOrmModule.forFeature([User, Role])],
    controllers: [authController],
    providers: [authService, usersRepository]
})
export class authModule {}