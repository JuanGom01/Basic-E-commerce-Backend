import { BadRequestException, ConflictException, Delete, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { UUID } from "crypto";
import { createUserDto } from "src/pipesDtos/userPipes.dto";
import { UserRole } from "src/auth/neededRoles.decorator";
import { Role } from "./roles.entity";



@Injectable()
export class usersRepository {
    constructor(@InjectRepository(User) private userRepository: Repository<User>,
  @InjectRepository(Role) private roleRepository: Repository<Role>) {}


    async getUserPage(page: number, limit: number): Promise<Omit<User, "password" | "active">[]> {
      try {
        let arrCopy: User[] = await this.userRepository.find({relations: ["orders", "orders.orderDetail", "orders.orderDetail.products"], where: {active: true}})
        let inicio = (page - 1) * limit;
        let fin = inicio + limit
        const userPage = arrCopy.slice(inicio, fin)
        return userPage.map(({password, active, ...rest}) => rest)
      } catch(err) {throw err}
    }

    async getUserById(id: UUID): Promise<Omit<User, "password" | "active">> {
      try {

        const user = await this.userRepository.findOne({where: {id, active: true}, relations: ["orders", "orders.orderDetail", "orders.orderDetail.products"]})
        if (!user) {
          throw new NotFoundException(`User with ID ${id} not found`);
        }
        const {password, active, ...rest} = user
        return rest
      } catch (err) {throw err}
    }

    async createUser(user: createUserDto): Promise<Omit<User, "password" | "roles" | "active">> {
      try {
        if (await this.userRepository.findOneBy({email: user.email})) {throw new ConflictException("ya existe un usuario con ese email")}

        const userRole = await this.roleRepository.findOne({where: {name: UserRole.USER}})
        
        const newUser = await this.userRepository.save({...user, roles: [userRole]})
        const {roles, active, password, passwordConfirmation, ...rest} = newUser
        return rest;
      } catch (err){throw err}
    }

    async updateUser(id: UUID, updateUser: Partial<User>): Promise<UUID> {
      try {

        const { email, name, password, address, phone, country, city, orders, active} = updateUser
        const updatedUser = { email, name, password, address, phone, country, city, orders, active}
        await this.userRepository.update(id, updatedUser)
        return id;
      } catch(err) {throw err}
    }

    async deleteUser(id: UUID): Promise<UUID> {
      try {

        const user = await this.userRepository.findOneBy({id})
        if (user) {
          if (user.active === false) {throw new BadRequestException("usuario ya se encontraba eliminado")}
          await this.userRepository.update(id, {...user, active: false})
          return id
        } else {throw new NotFoundException("usuario no encontrado")}
      } catch (err){throw err}
    }

    async getUserByEmail(email): Promise<User | null> {
        return this.userRepository.findOne({where: {email: email, active: true}, relations: ["roles"]})
    }

    async giveAdmin(id: UUID) {
      const user = await this.userRepository.findOne({where: {id: id, active: true}, relations: ["roles"]})
      if (!user) {throw new NotFoundException("usuario no encontrado")}
      
      const adminRole = await this.roleRepository.findOne({where: {name: UserRole.ADMIN}})
      
      if (user.roles.some(role => role.name === UserRole.ADMIN)) {throw new ConflictException(`El usuario ${user.name} con el id ${id}, ya es administrador.`)}
      
      user.roles.push(adminRole)
      await this.userRepository.save(user)
      return `el usuario ${user.name} con el id ${id} ahora es administrador`
    }

    async preLoadRoles() {
      for (const [key, value] of Object.entries(UserRole)) {
        const findedRole = await this.roleRepository.findOne({where: {name: value}})
        if (!findedRole) {this.roleRepository.save({name: value})}
      }
      console.log(await this.roleRepository.find())
    }
}