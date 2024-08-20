import { Body, Controller, Get, HttpCode, Param, ParseUUIDPipe, Post, Put, UseGuards } from "@nestjs/common";
import { authService } from "./auth.service";
import { loginUserDto } from "src/pipesDtos/loginUser.dto";
import { createUserDto } from "src/pipesDtos/userPipes.dto";
import { UUID } from "crypto";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { giveAdminDecorator, signInDecorator } from "./authController.decorator";



@ApiTags("auth")
@Controller("auth")
export class authController {
    constructor(private readonly authService: authService,
    ) {}
    
    
    @Post("/signup")
    @ApiOperation({summary: "registro de usuario"})
    @ApiResponse({status: 201, description: "el usuario fue creado con exito"})
    @ApiResponse({status: 400, description: "el usuario no pudo ser creado porque la petición no es correcta"})
    @ApiResponse({status: 409, description: "Ya existe un usuario con ese Email"})
    @HttpCode(201)
    async signUp(@Body() user: createUserDto) {
        return await this.authService.signUp(user)}

    @Post("signin")
    @signInDecorator()
    async signIN(@Body() credential: loginUserDto) {
        return await this.authService.signIn(credential)
    }

    @Put("/admin/:id")
    @giveAdminDecorator()
    async giveAdmin(@Param("id", ParseUUIDPipe) id: UUID) {
        return this.authService.giveAdmin(id)
    }
}