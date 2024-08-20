import { BadRequestException, ConflictException, Injectable, NotFoundException, Put } from "@nestjs/common";
import { createUserDto } from "src/pipesDtos/userPipes.dto";
import { usersRepository } from "src/users/users.repository";
import { UserService } from "src/users/users.service";
import * as bcrypt from "bcrypt"
import { loginUserDto } from "src/pipesDtos/loginUser.dto";
import { NotFoundError } from "rxjs";
import { JwtService } from "@nestjs/jwt";
import { UUID } from "crypto";


@Injectable()
export class authService {
    
    constructor(private userRepository: usersRepository,
        private JwtService: JwtService,
    ) {}
    
    async signUp(user: createUserDto) {
        if (user.password !== user.passwordConfirmation) {throw new BadRequestException("Las contraseñas no coinciden")}
        if (await this.userRepository.getUserByEmail(user.email)) {throw new ConflictException(`Ya hay un usuario registrado con ese email ${user.email}`)}

    const hashedPassword = await bcrypt.hash(user.password, 10)
    
    return await this.userRepository.createUser({...user, password: hashedPassword})
    }

    async signIn(credential: loginUserDto) {
        const user = await this.userRepository.getUserByEmail(credential.email)
        if (!user) {throw new BadRequestException("credenciales incorrectas")}
        const confirmPassword: boolean = await bcrypt.compare(credential.password, user.password) 
        if (!confirmPassword) {throw new BadRequestException("credenciales incorrectas")}


        const payload = {
            sub: user.id,
            email: user.email,
            roles: user.roles,
        }
        
        const token = this.JwtService.sign(payload)

        return {message: "login exitoso", token}
    }


    async giveAdmin(id: UUID) {
        return await this.userRepository.giveAdmin(id)
    }

    
}