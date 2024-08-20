import { HttpCode, UseGuards, applyDecorators } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { AuthGuard } from "src/auth/auth.guard";
import { RolesDecorator, UserRole } from "src/auth/neededRoles.decorator";
import { roleGuard } from "src/auth/roleGuard.guard";





export function addCategoryDecorator () {
    return applyDecorators(
    ApiOperation({summary: "sube una categoria con el nombre que se envie por body({name})"}),
    ApiResponse({status: 201, description: "la categoria fue subida con éxito"}),
    ApiResponse({status: 400, description: "No se pudo subir ya que la petición es incorrecta"}),
    ApiResponse({status: 409, description: "No se pudo subir porque ya existe una categoria con ese nombre"}),
    HttpCode(201),
    ApiBearerAuth(),
    RolesDecorator(UserRole.USER),
    UseGuards(AuthGuard, roleGuard)
    )
}


export function getCategoriesDecorator() {
    return applyDecorators(
    ApiOperation({summary: "Obtiene un array con todas las categorias de la DB"}),
    ApiResponse({status: 200, description: "Las categorias fueron obtenidas con éxito"}),
    HttpCode(200)
    )
}