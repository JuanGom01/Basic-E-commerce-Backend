import { Module } from "@nestjs/common";
import { UserService } from "./users.service";
import { UsersController } from "./users.controller";
import { usersRepository } from "./users.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Role } from "./roles.entity";




@Module({
    imports: [TypeOrmModule.forFeature([User, Role])],
    providers: [UserService, usersRepository],
    controllers: [UsersController],
})
export class userModule {}