import { HttpCode, UseGuards, applyDecorators } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";
import { AuthGuard } from "src/auth/auth.guard";
import { RolesDecorator, UserRole } from "src/auth/neededRoles.decorator";
import { roleGuard } from "src/auth/roleGuard.guard";




export function getUserDecorator() {
    return applyDecorators(
        ApiOperation({summary: "Obtiene una lista paginada de usuarios recibiendo por QueryParams limit(cantidad de usuarios de la pagina) y page(pagina de la lista)"}),
        ApiResponse({status: 200, description: "Los usuarios fueron obtenidos de forma exitosa"}),
        ApiParam({name:"page", required: false, description: "numero de pagina en la lista de usuarios(default:1)", type: Number}),
        ApiParam({name:"limit", required: false, description: "Cantidad de usuarios mostrados en una pagina(Default:5)", type: Number}),
        ApiBearerAuth(),
        RolesDecorator(UserRole.ADMIN),
        UseGuards(AuthGuard, roleGuard),
        HttpCode(200)
    )
}




export function getUserByIdDecoractor() {
    return applyDecorators(

        ApiOperation({summary: "Obtiene al usuario por id"}),
        ApiResponse({status: 200, description: "El usuario fue obtenido de forma exitosa"}),
        ApiResponse({status: 404, description: "El usuario no fue encontrado"}),
        ApiParam({name: "id", required: true, description: "el id del usuario que se quiere obtener", schema: {type: "string", format: "UUID"}}),
        ApiBearerAuth(),
        HttpCode(200),
        RolesDecorator(UserRole.ADMIN),
        UseGuards(AuthGuard, roleGuard)
    )
} 

export function updateUserDecorator() {
    return applyDecorators(
        
        ApiOperation({summary: "Modifica el usuario recibiendo los campos a modificar por body y el id de usuario por params"}),
        ApiResponse({status: 200, description: "El usuario fue actualizado de forma exitosa"}),
        ApiResponse({status: 404, description: "El usuario no fue encontrado"}),
        ApiResponse({status: 400, description: "La petición es incrorrecta"}),
        ApiParam({name:"id", required: true, description: "UUID del usuario a modificar", schema: {type: "string", format: "UUID"}}),
        ApiBearerAuth(),
        HttpCode(200),
        RolesDecorator(UserRole.USER),
        UseGuards(AuthGuard, roleGuard)
    )
}


export function deleteUserDecorator() {
    return applyDecorators(
        ApiOperation({summary: "Elimina a un usuario recibiendo su id"}),
        ApiResponse({status: 200, description: "El usuario fue eliminado de forma exitosa"}),
        ApiResponse({status: 404, description: "El usuario no fue encontrado"}),
        ApiResponse({status: 409, description: "El usuario ya se encontraba eliminado"}),
        ApiParam({name:"id", required: true, description: "UUID del usuario eliminar", schema: {type: "string", format: "UUID"}}),
        ApiBearerAuth(),
        HttpCode(200),
        RolesDecorator(UserRole.USER),
        UseGuards(AuthGuard, roleGuard)
    )
    }

