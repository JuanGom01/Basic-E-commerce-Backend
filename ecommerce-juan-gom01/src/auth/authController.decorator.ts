import { HttpCode, UseGuards, applyDecorators } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";
import { RolesDecorator, UserRole } from "./neededRoles.decorator";
import { AuthGuard } from "./auth.guard";
import { roleGuard } from "./roleGuard.guard";






export function signUpDecorator() {
    applyDecorators(
    ApiOperation({summary: "registro de usuario"}),
    ApiResponse({status: 201, description: "el usuario fue creado con exito"}),
    ApiResponse({status: 400, description: "el usuario no pudo ser creado porque la petición no es correcta"}),
    ApiResponse({status: 409, description: "Ya existe un usuario con ese Email"}),
    HttpCode(201)
    )
}



export function signInDecorator() {
    return applyDecorators(
    ApiOperation({summary: "Inicio de sesión de un usuario(retorna un token de sesión)"}),
    ApiResponse({status: 200, description: "El login fue exitoso"}),
    ApiResponse({status: 409, description: "Las credenciales son incorrectas"}),
    HttpCode(200)
    )
}




export function giveAdminDecorator() {
    return applyDecorators(
        ApiOperation({summary: "Ruta para dar amdministrador a un usuario"}),
        ApiParam({name:"id", description:"id del usuario que se desea dar el rol de administrador"}),
        ApiResponse({status: 200, description: "El usuario ahora tiene el rol de admin"}),
        ApiResponse({status: 401, description: "No se proporciono un token de acceso válido"}),
        ApiResponse({status: 403, description: "El usuario no tiene permiso para acceder a esta ruta"}),
        ApiResponse({status: 404, description: "El usuario no fue encontrado"}),
        ApiResponse({status: 409, description: "El usuario ya era administrador"}),
        ApiBearerAuth(),
        HttpCode(200),
        RolesDecorator(UserRole.ADMIN),
        UseGuards(AuthGuard, roleGuard)
    )
}