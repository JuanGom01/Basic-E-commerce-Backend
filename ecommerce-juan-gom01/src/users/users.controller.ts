import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, ParseUUIDPipe, Post, Put, Query, UseGuards } from "@nestjs/common";
import { UserService } from "./users.service";
import { AuthGuard } from "src/auth/auth.guard";
import { User } from "./user.entity";
import { updateUserDTO } from "src/pipesDtos/userPipes.dto";
import { UUID } from "crypto";
import { RolesDecorator, UserRole } from "src/auth/neededRoles.decorator";
import { roleGuard } from "src/auth/roleGuard.guard";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { deleteUserDecorator, getUserByIdDecoractor, getUserDecorator, updateUserDecorator } from "./userController.decorator";


@ApiTags("user")
@Controller("users")
export class UsersController {
    constructor (private readonly UserService: UserService) {}

    @Get()
    @getUserDecorator()
    async getUsers(@Query("page") page: string = "1", @Query("limit") limit: string = "5"): Promise<Omit<User, "password" | "active">[]> {
        return await this.UserService.getUsers(Number(page), Number(limit))
    }

    @Get(":id")
    @getUserByIdDecoractor()
    async getUserById(@Param("id", ParseUUIDPipe) id: UUID): Promise<Omit<User, "password" | "active">> {
        return await this.UserService.getUserById(id)
    }


    @Put(":id")
    @updateUserDecorator()
    async updateUser(@Param("id", ParseUUIDPipe) id: UUID, @Body() updateUser: updateUserDTO): Promise<UUID> {
        return await this.UserService.updateUser(id, updateUser);
    }

    @Delete(":id")
    @deleteUserDecorator()
    async deleteUser(@Param("id", ParseUUIDPipe) id: UUID): Promise<UUID> {
        const deletedUserId = await this.UserService.deleteUser(id)
        return deletedUserId
    }


}