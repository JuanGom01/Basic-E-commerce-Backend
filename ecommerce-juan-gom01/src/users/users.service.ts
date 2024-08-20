import { Injectable } from "@nestjs/common";
import { usersRepository } from "./users.repository";
import { UserDto } from "src/interfaces/Dtos/User.dto";
import { User } from "./user.entity";
import { UUID } from "crypto";



@Injectable()
export class UserService {

    constructor(private userRepository: usersRepository) {}
    async getUsers(page: number, limit: number): Promise<Omit<User, "password" | "active">[]> {
        return await this.userRepository.getUserPage(page, limit)
    }

    getUserById(id: UUID): Promise<Omit<User, "password" | "active">> {
        return this.userRepository.getUserById(id)
    }

    async updateUser(id: UUID, updateUser: Partial<UserDto>): Promise<UUID> {
        return await this.userRepository.updateUser(id, updateUser)
    }

    deleteUser(id: UUID): Promise<UUID> {
        return this.userRepository.deleteUser(id)
    }


} 
